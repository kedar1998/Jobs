import express from 'express'
const router = express.Router()
import authenticateUser from '../middleware/auth.js'

import {register, login, updateUser} from '../controllers/authController.js'
import rateLimiter from 'express-rate-limit'

const apiLimit = rateLimiter({
    windowMS: 15 * 60 * 1000, // 15 minutes
    max: 20,
    message: 'Too many request for this IP address, please try again later after 15 minutes',
})

router.route("/register").post(apiLimit, register)
router.route("/login").post(apiLimit, login)
router.route("/updateUser").patch(authenticateUser, updateUser)


export default router