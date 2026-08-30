import 'dotenv/config'
import mongoose from 'mongoose'
import dns from 'node:dns'
import bcrypt from 'bcrypt'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from './models/doctorModel.js'

// Fix for Node.js / Windows DNS querySrv error with MongoDB Atlas
try {
    dns.setServers(['8.8.8.8', '8.8.4.4'])
} catch (e) {
    console.error("DNS Server setting error:", e.message)
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

const sriLankanDoctors = [
    {
        name: 'Dr. Kasun Bandara',
        email: 'kasun.bandara@prescripto.lk',
        speciality: 'General physician',
        degree: 'MBBS (Colombo), MD (Medicine)',
        experience: '8 Years',
        hospital: 'Asiri Central Hospital',
        district: 'Colombo',
        about: 'Dr. Kasun Bandara is a senior consultant physician with extensive clinical experience at the National Hospital of Sri Lanka and Asiri Central Hospital. He specializes in comprehensive adult medical care, chronic disease management, and preventive wellness.',
        fees: 3000,
        address: {
            line1: 'No. 45, Ward Place',
            line2: 'Colombo 07'
        },
        imageFile: 'doc1.png'
    },
    {
        name: 'Dr. Chamari Wickramasinghe',
        email: 'chamari.w@prescripto.lk',
        speciality: 'Gynecologist',
        degree: 'MBBS (Peradeniya), MS (Obs & Gyn)',
        experience: '12 Years',
        hospital: 'Asiri Hospital Kandy',
        district: 'Kandy',
        about: 'Dr. Chamari Wickramasinghe is a respected consultant obstetrician and gynecologist serving at Teaching Hospital Peradeniya and Asiri Hospital Kandy. She is dedicated to women’s health, maternal-fetal wellness, and minimally invasive surgery.',
        fees: 4500,
        address: {
            line1: 'No. 120, Peradeniya Road',
            line2: 'Kandy'
        },
        imageFile: 'doc2.png'
    },
    {
        name: 'Dr. Dilani Senanayake',
        email: 'dilani.s@prescripto.lk',
        speciality: 'Dermatologist',
        degree: 'MBBS (Sri Jayewardenepura), MD (Dermatology)',
        experience: '7 Years',
        hospital: 'Durdans Hospital',
        district: 'Colombo',
        about: 'Dr. Dilani Senanayake specializes in clinical and cosmetic dermatology, offering advanced treatments for chronic skin conditions, acne management, and pediatric dermatological care at Durdans Hospital Colombo.',
        fees: 3500,
        address: {
            line1: 'No. 88, Havelock Road',
            line2: 'Colombo 05'
        },
        imageFile: 'doc3.png'
    },
    {
        name: 'Dr. Nuwan Jayawardena',
        email: 'nuwan.j@prescripto.lk',
        speciality: 'Pediatricians',
        degree: 'MBBS (Kelaniya), DCH, MD (Paediatrics)',
        experience: '10 Years',
        hospital: 'Neville Fernando Teaching Hospital',
        district: 'Colombo',
        about: 'Dr. Nuwan Jayawardena is a compassionate consultant pediatrician with over a decade of dedication to neonatal health, childhood development, vaccination programs, and adolescent medicine in Malabe.',
        fees: 3000,
        address: {
            line1: 'No. 14, Kandy Road',
            line2: 'Malabe, Colombo'
        },
        imageFile: 'doc4.png'
    },
    {
        name: 'Dr. Rohan Jayasuriya',
        email: 'rohan.j@prescripto.lk',
        speciality: 'Neurologist',
        degree: 'MBBS (Colombo), MD (Neurology), MRCP (UK)',
        experience: '15 Years',
        hospital: 'Lanka Hospitals',
        district: 'Colombo',
        about: 'Dr. Rohan Jayasuriya is a senior consultant neurologist practicing at Lanka Hospitals, known for his expertise in stroke rehabilitation, epilepsy management, and neuromuscular diagnostics.',
        fees: 5000,
        address: {
            line1: 'No. 210, Baseline Road',
            line2: 'Colombo 08'
        },
        imageFile: 'doc5.png'
    },
    {
        name: 'Dr. Anusha Fernando',
        email: 'anusha.f@prescripto.lk',
        speciality: 'Gastroenterologist',
        degree: 'MBBS (Ruhuna), MD (Gastroenterology)',
        experience: '9 Years',
        hospital: 'Ruhunu Hospital',
        district: 'Galle',
        about: 'Dr. Anusha Fernando is a leading consultant gastroenterologist and hepatologist practicing at Ruhunu Hospital Galle, specializing in endoscopy, liver health, and digestive tract disorders.',
        fees: 4000,
        address: {
            line1: 'No. 32, Hospital Road',
            line2: 'Galle'
        },
        imageFile: 'doc6.png'
    },
    {
        name: 'Dr. Thisara Gunaratne',
        email: 'thisara.g@prescripto.lk',
        speciality: 'General physician',
        degree: 'MBBS (Colombo), MCGP (SL)',
        experience: '6 Years',
        hospital: 'Nawaloka Medicare Negombo',
        district: 'Gampaha',
        about: 'Dr. Thisara Gunaratne is an experienced primary care physician in Negombo providing family medical consultations, health screenings, lifestyle disease management, and emergency primary care.',
        fees: 2500,
        address: {
            line1: 'No. 76, Main Street',
            line2: 'Negombo'
        },
        imageFile: 'doc7.png'
    },
    {
        name: 'Dr. Menaka Samaraweera',
        email: 'menaka.s@prescripto.lk',
        speciality: 'Gynecologist',
        degree: 'MBBS (Peradeniya), MRCOG (UK)',
        experience: '11 Years',
        hospital: 'Suwasevana Hospital',
        district: 'Kandy',
        about: 'Dr. Menaka Samaraweera is a consultant gynecologist practicing at Suwasevana Hospital Kandy, focusing on fertility diagnostics, prenatal wellness, and reproductive endocrinology.',
        fees: 4500,
        address: {
            line1: 'No. 55, Kurunegala Road',
            line2: 'Katugastota, Kandy'
        },
        imageFile: 'doc8.png'
    },
    {
        name: 'Dr. Sachini Alwis',
        email: 'sachini.a@prescripto.lk',
        speciality: 'Dermatologist',
        degree: 'MBBS (Colombo), Dip. in Dermatology',
        experience: '5 Years',
        hospital: 'Kings Hospital',
        district: 'Colombo',
        about: 'Dr. Sachini Alwis delivers holistic dermatological care at Kings Hospital Colombo, focusing on allergic skin diseases, laser procedures, and evidence-based skincare therapies.',
        fees: 3200,
        address: {
            line1: 'No. 112, Galle Road',
            line2: 'Mount Lavinia'
        },
        imageFile: 'doc9.png'
    },
    {
        name: 'Dr. Kusal Mendis',
        email: 'kusal.m@prescripto.lk',
        speciality: 'Pediatricians',
        degree: 'MBBS (Ruhuna), MD (Paediatrics)',
        experience: '8 Years',
        hospital: 'Cooperative Hospital Galle',
        district: 'Galle',
        about: 'Dr. Kusal Mendis is an attentive pediatrician at Cooperative Hospital Galle committed to child health, early developmental screening, asthma care, and nutrition counseling.',
        fees: 3000,
        address: {
            line1: 'No. 68, Wakwella Road',
            line2: 'Galle'
        },
        imageFile: 'doc10.png'
    },
    {
        name: 'Dr. Priyantha Dissanayake',
        email: 'priyantha.d@prescripto.lk',
        speciality: 'Neurologist',
        degree: 'MBBS (Peradeniya), MD, FRCP (London)',
        experience: '18 Years',
        hospital: 'Kandy Private Hospital',
        district: 'Kandy',
        about: 'Dr. Priyantha Dissanayake is a senior consultant neurologist in Kandy offering specialist consultations for migraine, Parkinson’s disease, and neurodegenerative conditions.',
        fees: 5500,
        address: {
            line1: 'No. 95, William Gopallawa Mawatha',
            line2: 'Kandy'
        },
        imageFile: 'doc11.png'
    },
    {
        name: 'Dr. Asanka Weerakkody',
        email: 'asanka.w@prescripto.lk',
        speciality: 'Gastroenterologist',
        degree: 'MBBS (Sri Jayewardenepura), MD, MRCP',
        experience: '10 Years',
        hospital: 'Nawaloka Hospital',
        district: 'Colombo',
        about: 'Dr. Asanka Weerakkody is a senior consultant in digestive diseases and therapeutic endoscopy at Nawaloka Hospital, committed to clinical excellence and compassionate patient care.',
        fees: 4200,
        address: {
            line1: 'No. 204, High Level Road',
            line2: 'Nugegoda, Colombo'
        },
        imageFile: 'doc12.png'
    },
    {
        name: 'Dr. Tharindu Rathnayake',
        email: 'tharindu.r@prescripto.lk',
        speciality: 'General physician',
        degree: 'MBBS (Jaffna), Dip. Family Medicine',
        experience: '4 Years',
        hospital: 'Miracle Hospital Kurunegala',
        district: 'Kurunegala',
        about: 'Dr. Tharindu Rathnayake provides comprehensive outpatient consultations, routine wellness checkups, cardiovascular risk assessments, and family health plans in Kurunegala.',
        fees: 2500,
        address: {
            line1: 'No. 18, Colombo Road',
            line2: 'Kurunegala'
        },
        imageFile: 'doc13.png'
    },
    {
        name: 'Dr. Oshadi Kulatunga',
        email: 'oshadi.k@prescripto.lk',
        speciality: 'Gynecologist',
        degree: 'MBBS (Colombo), MS (Obs & Gyn)',
        experience: '9 Years',
        hospital: 'Ninewells Hospital',
        district: 'Colombo',
        about: 'Dr. Oshadi Kulatunga is a dedicated consultant obstetrician and gynecologist at Ninewells Hospital with special interests in maternity care, fertility, and laparoscopic procedures.',
        fees: 4000,
        address: {
            line1: 'No. 72, Nawala Road',
            line2: 'Rajagiriya, Colombo'
        },
        imageFile: 'doc14.png'
    },
    {
        name: 'Dr. Chathura Abeysekara',
        email: 'chathura.a@prescripto.lk',
        speciality: 'Pediatricians',
        degree: 'MBBS (Colombo), DCH, MRCPCH (UK)',
        experience: '13 Years',
        hospital: 'Lady Ridgeway Private Wing',
        district: 'Colombo',
        about: 'Dr. Chathura Abeysekara is a senior consultant pediatrician with extensive clinical expertise across major pediatric intensive care and developmental health centers in Colombo.',
        fees: 3800,
        address: {
            line1: 'No. 150, Cotta Road',
            line2: 'Borella, Colombo 08'
        },
        imageFile: 'doc15.png'
    }
]

const seedDatabase = async () => {
    try {
        console.log('Connecting to MongoDB...')
        const dbName = process.env.MONGODB_DB_NAME || 'prescripto'
        const baseUri = process.env.MONGODB_URI.endsWith('/')
            ? process.env.MONGODB_URI.slice(0, -1)
            : process.env.MONGODB_URI

        await mongoose.connect(`${baseUri}/${dbName}`)
        console.log(`Connected to database: ${dbName}`)

        // Clear existing doctors collection
        console.log('Clearing existing doctors collection...')
        await doctorModel.deleteMany({})

        const salt = await bcrypt.genSalt(10)
        const defaultPassword = await bcrypt.hash('doctor123', salt)

        const frontendAssetsDir = path.resolve(__dirname, '../frontend/src/assets/assets/assets_frontend')

        console.log('Seeding 15 Sri Lankan doctors with hospitals & districts...')
        const doctorDocuments = []

        for (const doc of sriLankanDoctors) {
            let imageUrl = ''
            const localImagePath = path.join(frontendAssetsDir, doc.imageFile)

            if (fs.existsSync(localImagePath) && process.env.CLOUDINARY_API_KEY) {
                try {
                    console.log(`Uploading image for ${doc.name} to Cloudinary...`)
                    const uploadRes = await cloudinary.uploader.upload(localImagePath, {
                        folder: 'prescripto_doctors',
                        resource_type: 'image'
                    })
                    imageUrl = uploadRes.secure_url
                } catch (uploadErr) {
                    console.warn(`Cloudinary upload note for ${doc.name}: ${uploadErr.message}.`)
                    imageUrl = `https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop`
                }
            } else {
                imageUrl = `https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop`
            }

            doctorDocuments.push({
                name: doc.name,
                email: doc.email,
                password: defaultPassword,
                image: imageUrl,
                speciality: doc.speciality,
                degree: doc.degree,
                experience: doc.experience,
                hospital: doc.hospital,
                district: doc.district,
                about: doc.about,
                available: true,
                fees: doc.fees,
                address: doc.address,
                date: Date.now(),
                slots_booked: {}
            })
        }

        await doctorModel.insertMany(doctorDocuments)
        console.log(`Successfully seeded ${doctorDocuments.length} Sri Lankan doctors into MongoDB!`)

        // Check collections summary
        const totalDocs = await doctorModel.countDocuments()
        console.log(`Total doctors now in database: ${totalDocs}`)

        process.exit(0)
    } catch (error) {
        console.error('Seeding failed:', error)
        process.exit(1)
    }
}

seedDatabase()
