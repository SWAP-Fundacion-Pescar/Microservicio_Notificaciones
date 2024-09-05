import { Server } from "socket.io";
import NotificationCommand from "../../Infrastructure/Command/NotificationCommand";
import NotificationQuery from "../../Infrastructure/Query/NotificationQuery";
import NotificationServices from "../../Domain/Services/NotificationServices";
import INotificationCommand from "../../Infrastructure/Interfaces/INotificationCommand";
import INotificationQuery from "../../Infrastructure/Interfaces/INotificationQuery";
import INotificationServices from "../../Domain/Interfaces/INotificationServices";
import GetNotificationByTypeRequest from "../Request/GetNotificationByTypeRequest";

const notificationCommand: INotificationCommand = new NotificationCommand();
const notificationQuery: INotificationQuery = new NotificationQuery();
const notificationServices: INotificationServices = new NotificationServices(notificationCommand, notificationQuery);

function NotificationSocket(io:Server){
    io.on('connection', function (socket) {
        console.log('A user connected');
        const user = socket.request.user;
        if(user)
            {
                console.log('User id: ', user.id);
            }     
        socket.on('join', (userId) => {
            console.log('A user joined a room');
            socket.join(userId);
        })
        socket.on('getNotificationsChat', async (userId) =>{
            try{
                const type = "chat"
                const getNotificationByTypeRequest : GetNotificationByTypeRequest = new GetNotificationByTypeRequest(userId, type);
                const retrievedNotifications = await notificationServices.getNotificationByType(getNotificationByTypeRequest);
                io.to(userId).emit('notificationsChat', retrievedNotifications);
            }catch(error){
                console.error(error);
            }
        }) 
        socket.on('getNotificationsExchange', async (userId) =>{
            try{
                const type = "exchange"
                const getNotificationByTypeRequest : GetNotificationByTypeRequest = new GetNotificationByTypeRequest(userId, type);
                const retrievedNotifications = await notificationServices.getNotificationByType(getNotificationByTypeRequest);
                io.to(userId).emit('notificationsExchange', retrievedNotifications);
            }catch(error){
                console.error(error);
            }
        }) 
    })
}

export default NotificationSocket; 