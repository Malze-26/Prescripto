import validator from "validator";
import bcrypt from "bcrypt";
import fs from "node:fs";
import crypto from "node:crypto";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

// API to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" });
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password (min 8 characters)" });
        }

        // check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        };

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({ success: true, token });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// API for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// API to get user profile data
const getProfile = async (req, res) => {
    try {
        const userId = req.userId || req.body?.userId;
        const userData = await userModel.findById(userId).select('-password');

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, userData });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// API to update user profile
const updateProfile = async (req, res) => {
    const imageFile = req.file;
    try {
        const userId = req.userId || req.body?.userId;
        const { name, phone, address, dob, gender } = req.body;

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" });
        }

        let parsedAddress = address;
        if (typeof address === 'string') {
            try {
                parsedAddress = JSON.parse(address);
            } catch (e) {
                parsedAddress = { line1: address, line2: '' };
            }
        }

        await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            address: parsedAddress,
            dob,
            gender
        });

        if (imageFile) {
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { 
                folder: 'prescripto_users',
                resource_type: 'image' 
            });
            const imageURL = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, { image: imageURL });
        }

        res.json({ success: true, message: "Profile Updated" });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    } finally {
        if (imageFile && imageFile.path && fs.existsSync(imageFile.path)) {
            fs.unlink(imageFile.path, (err) => {
                if (err) console.error("Failed to delete user upload temp file:", err);
            });
        }
    }
}

// API to book appointment atomically to prevent race conditions
const bookAppointment = async (req, res) => {
    try {
        const userId = req.userId || req.body?.userId;
        const { docId, slotDate, slotTime } = req.body;

        if (!docId || !slotDate || !slotTime) {
            return res.json({ success: false, message: "Missing required booking details" });
        }

        const slotKey = `slots_booked.${slotDate}`;

        // Atomic lock/booking on doctor slot using findOneAndUpdate with $ne filter
        const updatedDoctor = await doctorModel.findOneAndUpdate(
            {
                _id: docId,
                available: true,
                [slotKey]: { $ne: slotTime }
            },
            {
                $push: { [slotKey]: slotTime }
            },
            { returnDocument: 'after' }
        ).select('-password');

        if (!updatedDoctor) {
            const checkDoc = await doctorModel.findById(docId);
            if (!checkDoc || !checkDoc.available) {
                return res.json({ success: false, message: 'Doctor not available' });
            }
            return res.json({ success: false, message: 'Slot not available (already booked). Please choose another time.' });
        }

        const userData = await userModel.findById(userId).select('-password');
        const docDataCopy = updatedDoctor.toObject();
        delete docDataCopy.slots_booked;

        // Calculate sequential queue token number for this doctor on this date
        const existingAppointmentsCount = await appointmentModel.countDocuments({
            docId,
            slotDate,
            cancelled: false
        });
        const tokenNumber = existingAppointmentsCount + 1;

        const appointmentData = {
            userId,
            docId,
            userData,
            docData: docDataCopy,
            amount: updatedDoctor.fees,
            slotTime,
            slotDate,
            tokenNumber,
            date: Date.now()
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        res.json({ success: true, message: `Appointment Booked! Your Token is #${tokenNumber < 10 ? '0' + tokenNumber : tokenNumber}`, tokenNumber });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// API to get user appointments for frontend 'my-appointments' page
const listAppointment = async (req, res) => {
    try {
        const userId = req.userId || req.body?.userId;
        const appointments = await appointmentModel.find({ userId });

        res.json({ success: true, appointments });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// API to cancel appointment atomically
const cancelAppointment = async (req, res) => {
    try {
        const userId = req.userId || req.body?.userId;
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.json({ success: false, message: 'Appointment not found' });
        }

        // verify appointment user
        if (appointmentData.userId.toString() !== userId.toString()) {
            return res.json({ success: false, message: 'Unauthorized action' });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // releasing doctor slot atomically
        const { docId, slotDate, slotTime } = appointmentData;
        const slotKey = `slots_booked.${slotDate}`;

        await doctorModel.findByIdAndUpdate(docId, {
            $pull: { [slotKey]: slotTime }
        });

        res.json({ success: true, message: 'Appointment Cancelled' });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// API to initialize PayHere online payment
const paymentPayhere = async (req, res) => {
    try {
        const userId = req.userId || req.body?.userId;
        const { appointmentId } = req.body;

        if (!appointmentId) {
            return res.json({ success: false, message: "Appointment ID is required" });
        }

        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        if (appointment.userId.toString() !== userId.toString()) {
            return res.json({ success: false, message: "Unauthorized action" });
        }

        if (appointment.cancelled) {
            return res.json({ success: false, message: "Appointment is cancelled" });
        }

        if (appointment.payment) {
            return res.json({ success: false, message: "Appointment is already paid" });
        }

        const user = await userModel.findById(userId).select('-password');
        const merchantId = process.env.PAYHERE_MERCHANT_ID || '1211149';
        const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET || '4Tuq6c6E9cO4G4P3O4Q4P3';
        const currency = 'LKR';
        const amountFormatted = parseFloat(appointment.amount).toFixed(2);

        // Generating PayHere MD5 checksum hash:
        // strtoupper(md5(merchant_id + order_id + amount + currency + strtoupper(md5(merchant_secret))))
        const hashedSecret = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
        const hash = crypto.createHash('md5')
            .update(merchantId + appointmentId + amountFormatted + currency + hashedSecret)
            .digest('hex')
            .toUpperCase();

        const nameParts = (user?.name || 'Patient User').trim().split(' ');
        const firstName = nameParts[0] || 'Patient';
        const lastName = nameParts.slice(1).join(' ') || 'User';

        const paymentData = {
            sandbox: process.env.PAYHERE_MODE !== 'live',
            merchant_id: merchantId,
            return_url: 'http://localhost:5173/my-appointments',
            cancel_url: 'http://localhost:5173/my-appointments',
            notify_url: `${process.env.BACKEND_URL || 'http://localhost:4000'}/api/user/payhere-notify`,
            order_id: appointmentId,
            items: `Consultation - ${appointment.docData.name}`,
            amount: amountFormatted,
            currency: currency,
            hash: hash,
            first_name: firstName,
            last_name: lastName,
            email: user?.email || 'patient@prescripto.lk',
            phone: user?.phone || '0771234567',
            address: user?.address?.line1 || 'No. 45, Ward Place',
            city: user?.address?.line2 || 'Colombo',
            country: 'Sri Lanka'
        };

        res.json({ success: true, paymentData });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// API for PayHere IPN Webhook Notification
const payhereNotify = async (req, res) => {
    try {
        const {
            merchant_id,
            order_id,
            payhere_amount,
            payhere_currency,
            status_code,
            md5sig
        } = req.body;

        const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET || '4Tuq6c6E9cO4G4P3O4Q4P3';
        const hashedSecret = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
        const localSig = crypto.createHash('md5')
            .update(merchant_id + order_id + payhere_amount + payhere_currency + status_code + hashedSecret)
            .digest('hex')
            .toUpperCase();

        if (localSig === md5sig && (Number(status_code) === 2 || status_code === '2')) {
            await appointmentModel.findByIdAndUpdate(order_id, { payment: true });
            console.log(`PayHere IPN: Appointment ${order_id} marked as PAID`);
            return res.status(200).send('OK');
        } else {
            console.warn(`PayHere IPN verification failed or status not success: status_code=${status_code}`);
            return res.status(400).send('Signature verification failed');
        }

    } catch (error) {
        console.error("PayHere IPN Error:", error);
        res.status(500).send(error.message);
    }
}

// API for Instant Client-Side Payment Verification (Local Sandbox & Completion Hook)
const verifyPayhere = async (req, res) => {
    try {
        const userId = req.userId || req.body?.userId;
        const { appointmentId } = req.body;

        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        if (appointment.userId.toString() !== userId.toString()) {
            return res.json({ success: false, message: "Unauthorized action" });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true });
        res.json({ success: true, message: "Payment Confirmed Successfully" });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

export { 
    registerUser, 
    loginUser, 
    getProfile, 
    updateProfile, 
    bookAppointment, 
    listAppointment, 
    cancelAppointment,
    paymentPayhere,
    payhereNotify,
    verifyPayhere
};
