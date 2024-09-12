import mongoose from "mongoose";

interface IClient {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    driverLicense: string;
}   

const ClientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    driverLicense: { type: String, required: true },    
});

const Client = mongoose.model<IClient>("Client", ClientSchema);

export { Client };