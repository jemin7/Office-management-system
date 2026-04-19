import mongoose, { connect } from "mongoose";


const connectDB = async () => {
    const connected = await mongoose.connect(process.env.DB_URL);
    
    console.log(`database connected: ${connected.connection.host}`)
}


export default connectDB


