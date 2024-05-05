import mongoose, { Document, Model } from 'mongoose';

interface SettingProps extends Document {
    webTitle: string | null;
    webTags: string[] | null;
    metaData: string | null;
}

const settingSchema = new mongoose.Schema<SettingProps>({
    webTitle: {
        type: String,
        required: true,
    },
    webTags: [String],
    metaData: {
        type: String,
        required: false,
    },
},{timestamps: true});

const Settings: Model<SettingProps> = mongoose.models.Settings || mongoose.model<SettingProps>('Settings', settingSchema);

export default Settings;
