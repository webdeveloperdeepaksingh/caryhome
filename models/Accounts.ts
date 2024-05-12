import mongoose from "mongoose";
import validator from "validator";

const accountsSchema = new mongoose.Schema ({        
    usrName:{
        type: String,
        unique: false,
    },
    usrEmail:{
        type: String,
        lowercase: true,
        unique: true, 
        validate: [validator.isEmail, 'Please enter a valid email.']   
    },
    usrPass:{
        type: String,
        minlength: [8, 'Password must be at least 8 characters long.'],
        runValidators: true,
        unique: false 
    },
    confPass:{
        type: String,
        minlength: [8, 'Confirm Password must be at least 8 characters long.'],
        runValidators: true,
        unique: false
    },
    usrPhone:{
        type: String,
        required: false,
        unique:true
    },
    usrRole:{
        type: String,
        default:"User"
    },
    usrImage:{
        type:String,
        required: false,
        unique:true
    },
    usrAddress:{
        type:String,
        required: false,
        unique:true
    },
    pwdResetToken: String,
    pwdResetTokenExpires: Date
},{timestamps: true});

const Accounts = mongoose.models.Accounts || mongoose.model("Accounts", accountsSchema);
export default Accounts;