import express from 'express';
import cors from 'cors';
import errorHandler from './Application/Middleware/ErrorHandler';
import MongoDB from './Infrastructure/Persistance/Config/MongoDB';
import router from './Application/Router/NotificationRouter';

MongoDB();
const app = express()
app.use(express.static('public'))
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);
export default app;