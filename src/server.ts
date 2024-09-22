import app from "./app"
import { createServer, IncomingMessage } from 'node:http';
import { Server } from "socket.io";
import INotificationServices from "./Domain/Interfaces/INotificationServices";
import NotificationServices from "./Domain/Services/NotificationServices";
import INotificationCommand from "./Infrastructure/Interfaces/INotificationCommand";
import NotificationCommand from "./Infrastructure/Command/NotificationCommand";
import INotificationQuery from "./Infrastructure/Interfaces/INotificationQuery";
import NotificationQuery from "./Infrastructure/Query/NotificationQuery";
import NotificationSocket from "./Application/Sockets/NotificationSockets";
import passport from "./Infrastructure/Config/Passport";

interface User
{
    id: string;
}
declare module 'node:http'
{
    interface IncomingMessage
    {
        user?: User;
    }
}
const PORT = process.env.PORT ?? 3004;
const server = createServer(app);
const io = new Server(server,
    {
        cors: {
            origin: "*" 
        },
        maxHttpBufferSize: 4e6 // 4Mb
    });
NotificationSocket(io);

const notificationCommand: INotificationCommand = new NotificationCommand();
const notificationQuery: INotificationQuery = new NotificationQuery();
const notificationServices: INotificationServices = new NotificationServices(notificationCommand, notificationQuery);

//Deberia utilizar el tipo correcto
io.engine.use((req: any, res: any, next: any) => {
    const isHandshake = req._query.sid === undefined;
    if (isHandshake) {
        passport.authenticate("jwt", { session: false })(req, res, next);
    } else {
        next();
    }
});

// Iniciamos el servidor en el puerto 3004
server.listen(PORT, function () {
    console.log(`Servidor iniciado en http://localhost:${PORT}`)
})

export default io;