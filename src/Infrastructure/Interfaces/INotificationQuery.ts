import GetNotificationByTypeRequest from "../../Application/Request/GetNotificationByTypeRequest";
import INotificationDocument from "./INotificationDocument";

interface INotificationQuery
{
    getNotificationByType(getNotificationByTypeRequest: GetNotificationByTypeRequest): Promise<Array<INotificationDocument>>;
}
export default INotificationQuery;