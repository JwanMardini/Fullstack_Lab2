import mongoose from 'mongoose';


const employeeSchema = new mongoose.Schema({
    full_name: { type: String, required: true, unique: true},
    email: { type: String, required: true },
    hashed_password: { type: String, required: false }

}, { collection: 'Employee' });

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;