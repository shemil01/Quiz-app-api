import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    email:string;
    token:string;
}

const UserSchema = new mongoose.Schema({
    email:{type:String, required: true, unique: true },
    token: { type: String, required: true },

})

export default mongoose.model<IUser>("User", UserSchema )