import CreateNotificationRequest from "../../Application/Request/CreateNotificationRequest";
import GetNotificationByTypeRequest from "../../Application/Request/GetNotificationByTypeRequest";
import Notification from "../Entities/Notification";

interface INotificationServices{
    createNotification(createNotificationRequest: CreateNotificationRequest): Promise<Notification>;
    deleteNotification(notificationId: string): Promise<void>;
    readNotification(notificationId:string): Promise<void>;
    getNotificationByUserId(userId: string): Promise<Array<Notification>>;
    getNotificationByType(getNotificationByTypeRequest: GetNotificationByTypeRequest): Promise<Array<Notification>>;
}
export default INotificationServices;