const mongoose = require("mongoose");

let DB_URI = process.env.DB_URI;

const connectDB = async () => {
  try {    
    await mongoose.connect(DB_URI);
      console.log("Successfully connected to database")  }
       catch (error: any) {
    console.log('Unable to connect to database: ',error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
