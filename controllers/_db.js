import Employee from "../models/Employee.js";
import Project from "../models/Project.js";
import ProjectAssignment from "../models/ProjectAssignment.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.CONECTION_URL;


export const connectDB = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export const getData = async (req, res) => {
    try{
        const aggregate = await ProjectAssignment.aggregate([
            {
                $lookup: {
                    from: 'Employee',
                    let: { employeeId: { $toObjectId: '$employee_id' } },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$_id', '$$employeeId'] }
                            }
                        }
                    ],
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
        ]);
        return aggregate;
    }catch(error){
        console.error('Error getting data:', error);
    }
};