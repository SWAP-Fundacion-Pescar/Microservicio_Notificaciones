import GetNotificationByTypeRequest from "../../Application/Request/GetNotificationByTypeRequest";
import INotificationDocument from "./INotificationDocument";

interface INotificationQuery
{
    getNotificationByUserId(userId: string): Promise<Array<INotificationDocument>>;
    getNotificationByType(getNotificationByTypeRequest: GetNotificationByTypeRequest): Promise<Array<INotificationDocument>>;
}
export default INotificationQuery;