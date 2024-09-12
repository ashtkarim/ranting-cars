import mongoose from "mongoose";

interface IAgency {
    imageUrl:string;
    name: string;
    email: string;
    password: string;
    address: string;
    description: string ;
    phoneNumber: string ;
    website: string ;
    latitude: number;
    longitude: number;
}

const AgencySchema = new mongoose.Schema({
    iamgeUrl:{type: String,required: false},
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    website: { type: String, required: false },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
});

const Agency = mongoose.model<IAgency>("Agency", AgencySchema);

export { Agency, IAgency };
