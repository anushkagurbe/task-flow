import mongoose from 'mongoose';

let dbConnect = async ()=>{
    try
    {
        await mongoose.connect(process.env.DB_URL);
        console.log("Database connected successfully");
    }
    catch(error)
    {
        console.log(error);
        process.exit(1);
    }
}

export default dbConnect;