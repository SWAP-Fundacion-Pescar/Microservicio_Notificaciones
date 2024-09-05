import GetNotificationByTypeRequest from '../../Application/Request/GetNotificationByTypeRequest';
import INotificationDocument from '../Interfaces/INotificationDocument';
import INotificationQuery from '../Interfaces/INotificationQuery';
import NotificationModel from '../Persistance/Models/NotificationModel';
import NotFoundException from '../../Application/Exceptions/NotFoundException';

class NotificationQuery implements INotificationQuery{
    async getNotificationByType(getNotificationByTypeRequest: GetNotificationByTypeRequest): Promise<Array<INotificationDocument>>{
        const retrievedNotification : Array<INotificationDocument> = await NotificationModel.find({$and: [{userId: getNotificationByTypeRequest.userId}, {type: getNotificationByTypeRequest.type}, {isRead:false}]})
        if(!retrievedNotification) throw new NotFoundException('No se encontro la notificación.');
        return retrievedNotification;
    };
}
export default NotificationQuery;