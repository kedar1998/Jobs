import {StatusCodes} from 'http-status-codes'


const ErrorHandlerMiddleware = (err,req,res,next) =>{
    console.log(err);

    const defaultError = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong, try again later'
    }

    res.status(defaultError.statusCode).json({
        msg: 'there was an error'
    })

}

export default ErrorHandlerMiddleware