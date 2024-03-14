import mongoose from "mongoose";


const connectDB = async () => {
  try {    
    var config = process.env.APP_CONFIG?JSON.parse(process.env.APP_CONFIG!):{};
    var mongoPassword = 'Madridian123!@#';

    let DB_URI =  process.env.APP_CONFIG?"mongodb://" + config.mongo.user + ":" + encodeURIComponent(mongoPassword) + "@" + 
    config.mongo.hostString:process.env.DB_URI;    
    await mongoose.connect(DB_URI!);
      console.log("Successfully connected to database")  }
       catch (error: any) {
    console.log('Unable to connect to database: ',error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
