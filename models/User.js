import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Provide Name'],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please Provide Email'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please Provide Valid Email'
        }
    },
    password: {
        type: String,
        trim: true,
        minlength: 6,
    },
    lastName: {
        type: String,
        trime: true,
        maxlength: 20,
        default: 'lastName'
    },
    location: {
        type: String,
        trim: true,
        maxlength: 20,
        default: 'my city'

    }
})

export default mongoose.model('User', userSchema)