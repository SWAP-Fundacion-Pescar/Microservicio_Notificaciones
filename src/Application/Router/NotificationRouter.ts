import {Router} from 'express';
import NotificationController from '../Controller/NotificationController';
import NotificationServices from '../../Domain/Services/NotificationServices';
import NotificationQuery from '../../Infrastructure/Query/NotificationQuery';
import NotificationCommand from '../../Infrastructure/Command/NotificationCommand';
import { authenticateJwt } from '../Middleware/PassportMiddleware';

const router = Router();
const command = new NotificationCommand();
const query = new NotificationQuery();
const notificationServices = new NotificationServices(command, query);
const controller = new NotificationController(notificationServices);

router.post('/notification', authenticateJwt, controller.createNotification);
router.delete('/notification/:notificationId',  authenticateJwt, controller.deleteNotification);
router.put('/notification',  authenticateJwt, controller.readNotification);

export default router;