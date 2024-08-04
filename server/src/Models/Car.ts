import mongoose, { Document, Schema } from "mongoose";

export interface ICar extends Document {
  name: string;
  year: string;
  model: string;
}

const CarSchema: Schema = new Schema({});

export default mongoose.model<ICar>("Car");
