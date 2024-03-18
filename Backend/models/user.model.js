import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        maxLength:[20,"Name contains only 8 character"],
        minLength:[5,"Name contains atleast 5 character"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        unique:[true,"Email is already registered"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:[8,"Password contains atleast 8 character"],
        maxLength:[16,"Password not contain more then 16 character"],
        select:false
    },
    age:{
        type:Number,
        required:[true,"Age is required"]
    },
    avatar:{
        type:String,
        required:[true,"Avatar is required"]
    }

});

userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods.generateJwtToken = function(){
    return jwt.sign(
        {_id:this._id},
        process.env.JWT_SECRET_KEY,
        {expiresIn:process.env.JWT_EXPIRES}
        )
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

export const User = mongoose.model("User",userSchema);