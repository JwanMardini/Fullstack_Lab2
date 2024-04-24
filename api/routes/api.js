import express from 'express';
import { connectDB, getData, addEmployee, addProject, addProjectAssignment} from '../../controllers/_db.js';

const apiRouter = express.Router();

connectDB(); // Connect to MongoDB

apiRouter.get('/', async (req, res) => {
    try{
        const data = await getData();
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({error: error.message});
    }

});

apiRouter.post('/employee', async (req, res) => {
    try{
        const employeeData = req.body;
        const employeeAdded = await addEmployee(employeeData);
        res.status(201).json(employeeAdded);
    }catch(error){
        res.status(500).json({error: error.message});
    }

});

apiRouter.post('/projects', async (req, res) => {
    try{
        const projectData = req.body;
        const projectAdded = await addProject(projectData);
        res.status(201).json(projectAdded);
    }catch(error){
        res.status(500).json({error: error.message});
    }

});

apiRouter.post('/project_assignments', async (req, res) => {
    try{
        const projectAssignmentData = req.body;
        const projectAssignmentAdded = await addProjectAssignment(projectAssignmentData);
        res.status(201).json(projectAssignmentAdded);
    }catch(error){
        res.status(500).json({error: error.message});    }
});

export default apiRouter;