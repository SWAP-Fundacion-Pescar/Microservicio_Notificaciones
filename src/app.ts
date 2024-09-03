import express from 'express';
import cors from 'cors';
import errorHandler from './Application/Middleware/ErrorHandler';
import MongoDB from './Infrastructure/Persistence/Config/MongoDB';

MongoDB();
const app = express()
app.use(express.static('public'))
app.use(cors());
app.use(express.json());
app.use(errorHandler);
export default app;