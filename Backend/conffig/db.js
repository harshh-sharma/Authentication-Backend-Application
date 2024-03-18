import mongoose from "mongoose";

const connectToDB =  async () => {
    await mongoose.connect(process.env.MONGO_URI,{
        dbName:"userAuthentication"
     }).then((conn) => {
        console.log("DB connected successfully");
     }).catch(error => {
        console.log(error.message);
     });
}

 export default connectToDB;