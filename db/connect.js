import mongoose from 'mongoose'

const connectDB = (url) => {
    return mongoose.connect(url).then(() =>{
        console.log("DB Connected");
    })
}

export default connectDB