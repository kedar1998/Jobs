import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
        select: false,
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


userSchema.pre("save", async function(){
    let salt = await bcrypt.genSalt(6)
    this.password = await bcrypt.hash(this.password, salt)
})


userSchema.methods.createJWT = function(){
    const token = jwt.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
    return token
}


export default mongoose.model('User', userSchema)