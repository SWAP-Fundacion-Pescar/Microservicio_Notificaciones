import {Router} from 'express';
import NotificationController from '../Controller/NotificationController';
import NotificationServices from '../../Domain/Services/NotificationServices';
import NotificationQuery from '../../Infrastructure/Query/NotificationQuery';
import NotificationCommand from '../../Infrastructure/Command/NotificationCommand';

const router = Router();
const command = new NotificationCommand();
const query = new NotificationQuery();
const notificationServices = new NotificationServices(command, query);
const controller = new NotificationController(notificationServices);

router.post('/notification', controller.createNotification);
router.delete('/notification/:notificationId', controller.deleteNotification);
router.put('/notification', controller.readNotification);
router.get('/notification/:userId', controller.getNotificationByUserId);
router.get('/notification', controller.getNotificationByType);

export default router;