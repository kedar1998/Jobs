import User from '../models/User.js'
import {StatusCodes} from 'http-status-codes'
import {BadRequestError, UnauthenticatedError} from '../errors/index.js'

const register = async (req,res,next) =>{

    const {name,email,password} = req.body

    if(!name || !email || !password){
        throw new BadRequestError("Please provide all values")
    }

    const userAlreadyExist = await User.findOne({email})

    if(userAlreadyExist){
        throw new BadRequestError("Email already in use")
    }

    const user = await User.create(req.body)

    const token = user.createJWT()

    res.status(StatusCodes.CREATED).json({
        email: user.email,
        lastName: user.lastName,
        location: user.location,
        name: user.name,
        token
    })
}

const login = async (req,res) =>{
    const {email, password} = req.body

    if(!email || !password){
        throw new BadRequestError("Please provide all values")
    }

    const user = await User.findOne({email}).select("+password")

    if(!user){
        throw new UnauthenticatedError("Invalid Credentials")
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect){
        throw new UnauthenticatedError("Invalid Credentials")
    }

    const token = user.createJWT()

    user.password = undefined

    res.status(StatusCodes.OK).json({
        user, token, location: user.location
    })


}

const updateUser = async (req,res) =>{
    res.send("Update User")
}

export {register, login, updateUser}