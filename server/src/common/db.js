import mogoose, { connect } from "mongoose";


const connectDB = async () => {
    const connected = await mogoose.connect(process.env.DB_URL);
    
    console.log(`database connected: ${connected.connection.host}`)
}


export default connectDB