import {Router} from 'express';
import NotificationController from '../Controller/NotificationController';
import NotificationServices from '../../Domain/Services/NotificationServices';
import NotificationQuery from '../../Infrastructure/Query/NotificationQuery';
import NotificationCommand from '../../Infrastructure/Command/NotificationCommand';
import { authenticateJwt } from '../Middleware/PassportMiddleware';
import {validateCreateNotification, validateReadNotification, validateDeleteNotification} from '../Middleware/Validator/NotificationValidator'

const router = Router();
const command = new NotificationCommand();
const query = new NotificationQuery();
const notificationServices = new NotificationServices(command, query);
const controller = new NotificationController(notificationServices);

router.post('/notification', validateCreateNotification, authenticateJwt, controller.createNotification);
router.delete('/notification/:notificationId', validateDeleteNotification, authenticateJwt, controller.deleteNotification);
router.put('/notification', validateReadNotification, authenticateJwt, controller.readNotification);

export default router;