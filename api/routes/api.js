import express from 'express';
import { connectDB, getData } from '../../controllers/_db.js';

const apiRouter = express.Router();

connectDB(); // Connect to MongoDB

apiRouter.get('/', async (req, res) => {
    try{
        const data = await getData();
        res.status(200).json(data);
    }catch(error){
        res.status(500).send('Error getting data');
    }

});

export default apiRouter;