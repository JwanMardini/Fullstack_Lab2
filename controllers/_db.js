import ProjectAssignment from "../models/ProjectAssignment.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.CONNECTION_URL;


export const connectDB = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export const getData = async () => {
    try{
        const aggregate = await ProjectAssignment.aggregate([
            {
                $lookup: {
                    from: 'Employee',
                    localField: 'employee_id',
                    foreignField: '_id',
                    as: 'employee'
                }
            },
            {
                $lookup: {
                    from: 'Project',
                    localField: 'project_code',
                    foreignField: 'project_code',
                    as: 'project'
                }
            }
        ])
        return aggregate;
    }catch(error){
        console.error('Error getting data:', error);
    }
};