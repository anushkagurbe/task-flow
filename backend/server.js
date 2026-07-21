import 'dotenv/config';
import app from './app.js';
import dbConnect from './config/db.js';

let PORT = process.env.PORT || 5000;

let startServer = async () =>{
    try
    {
        await dbConnect();
        app.listen(PORT, ()=>{
            console.log("Server is running on port", PORT);
        })
    }
    catch(error)
    {
        console.log(error);
        process.exit(1);
    }

}

startServer();
