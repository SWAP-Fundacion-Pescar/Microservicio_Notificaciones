import INotificationServices from "../Interfaces/INotificationServices";
import INotificationCommand from "../../Infrastructure/Interfaces/INotificationCommand";
import INotificationQuery from "../../Infrastructure/Interfaces/INotificationQuery";
import CreateNotificationRequest from "../../Application/Request/CreateNotificationRequest";
import Notification from "../Entities/Notification";
import GetNotificationByTypeRequest from "../../Application/Request/GetNotificationByTypeRequest";

class NotificationServices implements INotificationServices{
    private notificationCommand: INotificationCommand;
    private notificationQuery: INotificationQuery;
    constructor(notificationCommand: INotificationCommand, notificationQuery: INotificationQuery)
    {
        this.notificationCommand = notificationCommand;
        this.notificationQuery = notificationQuery;
    }
    async createNotification(createNotificationRequest: CreateNotificationRequest): Promise<Notification> {
        const createdNotification : Notification = await this.notificationCommand.createNotification(createNotificationRequest);
        return createdNotification;
    }
    async deleteNotification(notificationId: string): Promise<void>{
        await this.notificationCommand.deleteNotification(notificationId);
    };
    async readNotification(notificationId:string): Promise<void>{
        await this.notificationCommand.readNotification(notificationId);
    };
    async getNotificationByType(getNotificationByTypeRequest: GetNotificationByTypeRequest): Promise<Array<Notification>>{
        const retrievedNotification : Array<Notification> = await this.notificationQuery.getNotificationByType(getNotificationByTypeRequest)
        return retrievedNotification;
    };
}
export default NotificationServices;