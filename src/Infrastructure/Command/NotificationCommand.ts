import CreateNotificationRequest from "../../Application/Request/CreateNotificationRequest";
import INotificationCommand from "../Interfaces/INotificationCommand";
import INotificationDocument from "../Interfaces/INotificationDocument";
import NotificationModel from "../Persistance/Models/NotificationModel";
import NotFoundException from "../../Application/Exceptions/NotFoundException";

class NotificationCommand implements INotificationCommand{
    async createNotification(createNotificationRequest: CreateNotificationRequest): Promise<INotificationDocument> {
        const createdNotification: INotificationDocument = new NotificationModel(createNotificationRequest);
        await createdNotification.save();
        return createdNotification;
    }
    async deleteNotification(notificationId: string): Promise<void> {
        const retrievedNotification: INotificationDocument | null = await NotificationModel.findByIdAndDelete(notificationId);
        if(!retrievedNotification) throw new NotFoundException('No se encontro la notificación');
    }
    async readNotification(notificationId: string): Promise<void> {
        const retrievedNotification: INotificationDocument | null = await NotificationModel.findById(notificationId);
        if(!retrievedNotification)throw new NotFoundException('No se encontro la notificación');  
        retrievedNotification.isRead = true;
        await retrievedNotification.save();
    }
}
export default NotificationCommand;