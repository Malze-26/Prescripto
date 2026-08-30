import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Kasun Bandara',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS (Colombo), MD (Medicine)',
        experience: '8 Years',
        about: 'Dr. Kasun Bandara is a senior consultant physician specializing in comprehensive adult medical care, chronic disease management, and preventive wellness.',
        fees: 3000,
        address: {
            line1: 'No. 45, Ward Place',
            line2: 'Colombo 07'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Chamari Wickramasinghe',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS (Peradeniya), MS (Obs & Gyn)',
        experience: '12 Years',
        about: 'Dr. Chamari Wickramasinghe is a dedicated consultant obstetrician and gynecologist specializing in women’s wellness, maternal care, and minimally invasive surgery.',
        fees: 4500,
        address: {
            line1: 'No. 120, Peradeniya Road',
            line2: 'Kandy'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Dilani Senanayake',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS (Sri Jayewardenepura), MD (Dermatology)',
        experience: '7 Years',
        about: 'Dr. Dilani Senanayake specializes in clinical and cosmetic dermatology, providing modern treatments for skin, hair, and pediatric dermatological conditions.',
        fees: 3500,
        address: {
            line1: 'No. 88, Havelock Road',
            line2: 'Colombo 05'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Nuwan Jayawardena',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS (Kelaniya), DCH, MD (Paediatrics)',
        experience: '10 Years',
        about: 'Dr. Nuwan Jayawardena is an experienced consultant pediatrician focused on child health development, immunizations, and pediatric outpatient care.',
        fees: 3000,
        address: {
            line1: 'No. 14, Kandy Road',
            line2: 'Malabe, Colombo'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Rohan Jayasuriya',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS (Colombo), MD (Neurology), MRCP (UK)',
        experience: '15 Years',
        about: 'Dr. Rohan Jayasuriya is a senior consultant neurologist offering expert clinical management for headache, epilepsy, stroke rehabilitation, and movement disorders.',
        fees: 5000,
        address: {
            line1: 'No. 210, Baseline Road',
            line2: 'Colombo 08'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Anusha Fernando',
        image: doc6,
        speciality: 'Gastroenterologist',
        degree: 'MBBS (Ruhuna), MD (Gastroenterology)',
        experience: '9 Years',
        about: 'Dr. Anusha Fernando is a consultant gastroenterologist specializing in digestive tract care, therapeutic endoscopy, and hepatic wellness.',
        fees: 4000,
        address: {
            line1: 'No. 32, Hospital Road',
            line2: 'Galle'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Thisara Gunaratne',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS (Colombo), MCGP (SL)',
        experience: '6 Years',
        about: 'Dr. Thisara Gunaratne delivers dedicated family medicine, routine wellness checkups, and early diagnostics for chronic metabolic diseases.',
        fees: 2500,
        address: {
            line1: 'No. 76, Main Street',
            line2: 'Negombo'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Menaka Samaraweera',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS (Peradeniya), MRCOG (UK)',
        experience: '11 Years',
        about: 'Dr. Menaka Samaraweera is an experienced obstetrician and gynecologist with deep focus on prenatal health, reproductive endocrinology, and fertility.',
        fees: 4500,
        address: {
            line1: 'No. 55, Kurunegala Road',
            line2: 'Katugastota, Kandy'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Sachini Alwis',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS (Colombo), Dip. Dermatology',
        experience: '5 Years',
        about: 'Dr. Sachini Alwis offers patient-centered dermatological care, focusing on allergies, laser skin therapies, and cosmetic dermatology.',
        fees: 3200,
        address: {
            line1: 'No. 112, Galle Road',
            line2: 'Mount Lavinia'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Kusal Mendis',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS (Ruhuna), MD (Paediatrics)',
        experience: '8 Years',
        about: 'Dr. Kusal Mendis provides compassionate pediatric healthcare, allergy evaluations, asthma management, and nutritional support for infants and children.',
        fees: 3000,
        address: {
            line1: 'No. 68, Wakwella Road',
            line2: 'Galle'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Priyantha Dissanayake',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS (Peradeniya), MD, FRCP (London)',
        experience: '18 Years',
        about: 'Dr. Priyantha Dissanayake is a leading neurologist delivering expert diagnostic consultations for neurological disorders across Sri Lanka.',
        fees: 5500,
        address: {
            line1: 'No. 95, William Gopallawa Mawatha',
            line2: 'Kandy'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Asanka Weerakkody',
        image: doc12,
        speciality: 'Gastroenterologist',
        degree: 'MBBS (Sri Jayewardenepura), MD, MRCP',
        experience: '10 Years',
        about: 'Dr. Asanka Weerakkody specializes in diagnostic gastroenterology, inflammatory bowel disease management, and endoscopic procedures.',
        fees: 4200,
        address: {
            line1: 'No. 204, High Level Road',
            line2: 'Nugegoda, Colombo'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Tharindu Rathnayake',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS (Jaffna), Dip. Family Medicine',
        experience: '4 Years',
        about: 'Dr. Tharindu Rathnayake delivers quality general medicine, routine health screens, and personalized preventive care.',
        fees: 2500,
        address: {
            line1: 'No. 18, Colombo Road',
            line2: 'Kurunegala'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Oshadi Kulatunga',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS (Colombo), MS (Obs & Gyn)',
        experience: '9 Years',
        about: 'Dr. Oshadi Kulatunga specializes in obstetric evaluations, high-risk maternity care, and advanced gynecological wellness.',
        fees: 4000,
        address: {
            line1: 'No. 72, Nawala Road',
            line2: 'Rajagiriya, Colombo'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Chathura Abeysekara',
        image: doc15,
        speciality: 'Pediatricians',
        degree: 'MBBS (Colombo), DCH, MRCPCH (UK)',
        experience: '13 Years',
        about: 'Dr. Chathura Abeysekara brings over 13 years of pediatric clinical experience in pediatric intensive care and developmental pediatrics.',
        fees: 3800,
        address: {
            line1: 'No. 150, Cotta Road',
            line2: 'Borella, Colombo 08'
        }
    }
]