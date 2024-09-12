import mongoose from "mongoose";

interface ICar {
    make: string;
    model: string;
    year: number;
    price:number;
    color:string;
    mileage:number;
    vin:string;
    imageUrl:string;
    licensePlate: string;
    agencyId: string;
}

const CarSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    mileage: { type: Number, required: true },
    vin: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    licensePlate: { type: String, required: true },
    agencyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agency', required: true } 
});

const Car = mongoose.model<ICar>("Car", CarSchema);

export { Car, ICar };