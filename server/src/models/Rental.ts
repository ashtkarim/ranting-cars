import mongoose from "mongoose";

interface Rental {
    id: number;
    startDate: Date;
    endDate: Date;
    totalCost: number;
    status: string;
    carId: number;
    customerId: number;
    agencyId: number;
}

const RentalSchema = new mongoose.Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalCost: { type: Number, required: true },
    status: { type: String, required: true },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    agencyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agency', required: true },
});

const Rental = mongoose.model<Rental>("Rental", RentalSchema);

export { Rental };