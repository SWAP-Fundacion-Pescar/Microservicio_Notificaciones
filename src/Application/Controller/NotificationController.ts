import { Request, Response, NextFunction } from "express";
import INotificationServices from "../../Domain/Interfaces/INotificationServices";
import CreateNotificationRequest from "../Request/CreateNotificationRequest";
import io from "../../server";

interface User{
    id:string;
}

class NotificationController{
    private notificationServices: INotificationServices;
    constructor(notificationServices: INotificationServices)
    {
        this.notificationServices = notificationServices;
        this.createNotification = this.createNotification.bind(this);
        this.deleteNotification = this.deleteNotification.bind(this);
        this.readNotification = this.readNotification.bind(this); 
    }
    async createNotification(req: Request, res: Response, next: NextFunction): Promise<void>{
        try
        {
            console.log(req.body);
            const user = req.user as User;
            const { content, type, hasImage } : CreateNotificationRequest = req.body;
            const createNotificationRequest: CreateNotificationRequest = new CreateNotificationRequest(user.id, content, type, hasImage);
            const createdNotification = await this.notificationServices.createNotification(createNotificationRequest);
            const sockets = await io.in(user.id).fetchSockets();
            if(sockets.length>0){
                io.to(user.id).emit('notification', createdNotification);
            }
            res.status(201).send(createdNotification.id); // Solo deberia ser utilizado por el microservicio de Intercambios y Chats
        }
        catch(error)
        {
            next(error);
        }
    }
    async deleteNotification(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{            
            const notificationId  = req.params.notificationId as string;
            await this.notificationServices.deleteNotification(notificationId);
            res.status(200).send('La notificación se elimino con exito') // Solo deberia ser utilizado por el microservicio de Intercambios y Chats
        }catch(error)
        {
            next(error);
        }
    }
    async readNotification(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const {notificationId} = req.body;
            await this.notificationServices.readNotification(notificationId);
            res.status(204).send('Ok.');
        }catch (error){
            next(error);
        }
    }
}
export default NotificationController;