import mongoose from "mongoose";

let isConnected = false; // t

export const connectToTB = async() => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log('MongoDb is already Connected');
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:'share_promt',
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        
        isConnected = true;
        console.log('MongoDb Connected');
    } catch (error) {
        console.log(error);
    }
}