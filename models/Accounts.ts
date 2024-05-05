import mongoose, { Document, Model } from 'mongoose';

interface AccountProps extends Document {
    usrName: string;
    usrEmail: string;
    usrRole: string;
    usrPhone: string;
}

const accountSchema = new mongoose.Schema<AccountProps>({
    usrName: {
        type: String,
        required: [true, "Username is required."],
    },
    usrEmail: {
        type: String,
        required: [true, "User email is required."],
    },
    usrRole: {
        type: String,
        default:"User"
    },
    usrPhone:{
        type: String,
        required: false
    }
},{timestamps: true});

const Accounts: Model<AccountProps> = mongoose.models.Accounts || mongoose.model<AccountProps>('Accounts', accountSchema);
export default Accounts;
