import CreateNotificationRequest from "../../Application/Request/CreateNotificationRequest";
import INotificationDocument from "./INotificationDocument";

interface INotificationCommand
{
    createNotification(createNotificationRequest: CreateNotificationRequest): Promise<INotificationDocument>;
    deleteNotification(notificationId: string): Promise<void>;
    readNotification(notificationId:string): Promise<void>;
}
export default INotificationCommand;