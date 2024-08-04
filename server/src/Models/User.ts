import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: string;
  verified: boolean;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: {
    type: String,
    enum: ["Normal", "Seller"],
    default: "Normal",
  },
  verified: { type: Boolean, default: false },
});

export default mongoose.model<IUser>("User", UserSchema);
