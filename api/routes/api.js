import express from 'express';
import dotenv from 'dotenv';
import { connectDB, getData } from '../../controllers/_db.js';

dotenv.config();

const apiRouter = express.Router();

connectDB(); // Connect to MongoDB

apiRouter.get('/', async (req, res) => {
    try{
        const data = await getData(req, res);
        res.status(200).json(data);
    }catch(error){
        res.status(500).send('Error getting data');
    }

});

export default apiRouter;