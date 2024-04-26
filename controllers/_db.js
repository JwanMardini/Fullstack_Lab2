import ProjectAssignment from "../models/ProjectAssignment.js";
import Employee from "../models/Employee.js";
import Project from "../models/Project.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// eslint-disable-next-line no-undef
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
        throw new Error('Error getting data:', error);
    }
};


export const addEmployee = async (employeeData) => {
    try {
        const checkEmployee = await Employee.findOne({email: employeeData.email});
        if(checkEmployee){
            throw new Error('Employee already exists');
        }
        const employeeAdded = await Employee.create(employeeData);
        return employeeAdded;
    } catch (error) {
        throw new Error('Error adding employee:', error);
    }
}

export const addProject = async (projectData) => {
    try {
        const projectAdded = await Project.create(projectData);
        return projectAdded;
    } catch (error) {
        throw new Error('Error adding project:', error);
    }
}


export const addProjectAssignment = async (projectAssignmentData) => {
    try {
        const checkEmployee = await Employee.findById(projectAssignmentData.employee_id);
        if(!checkEmployee){
            throw new Error('Employee not found');
        }

        const checkProject = await Project.findOne({project_code: projectAssignmentData.project_code});
        if(!checkProject){
            throw new Error('Project not found');
        }
        const projectAssignmentAdded = await ProjectAssignment.create(projectAssignmentData);
        return projectAssignmentAdded;
    } catch (error) {
        throw new Error('Error adding project assignment:', error);
    }

}