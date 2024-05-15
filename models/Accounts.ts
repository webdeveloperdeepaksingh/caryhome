import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const validateEmail:any = (email:any) => {
    const re = /^[\w.-]+@[\w-]+(\.[\w-]{2,3})+$/;
    return re.test(email);
};

const accountsSchema = new mongoose.Schema ({        
    usrName:{
        type: String,
        unique: false,
    },
    usrEmail:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Please enter a valid email address'],
        match: [/^[\w.-]+@[\w-]+(\.[\w-]{2,3})+$/, 'Please enter a valid email address']  
    },
    usrPass:{
        type: String,
        minLength: [8, 'Password must be at least 8 characters long.'],
        unique: false,
        runValidators: true
    },
    confPass:{
        type: String,
        minLength: [8, 'Confirm Password must be at least 8 characters long.'],
        unique: false,
        runValidators:true
    },
    usrPhone:{
        type: String,
        required: false,
        unique:true,
        sparse: true
    },
    usrRole:{
        type: String,
        default:"User"
    },
    usrImage:{
        type:String,
        required: false,
        unique:true,
        sparse:true
    },
    usrAddress:{
        type:String,
        required: false,
    },
    pwdResetToken: String,
    pwdResetTokenExpires: Date
},{timestamps: true});

accountsSchema.pre('save', async function(next){    
    if(this.isModified('usrPass')){
        const password = this.usrPass as string;
        this.usrPass = await bcrypt.hash(password, 12);
     }
    this.confPass = undefined; //stopping confPass to be saved in db.
    next();
});

const Accounts = mongoose.models.Accounts || mongoose.model("Accounts", accountsSchema);
export default Accounts;