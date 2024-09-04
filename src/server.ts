import app from "./app"
import { createServer, IncomingMessage } from 'node:http';
import { Server } from "socket.io";
import INotificationServices from "./Domain/Interfaces/INotificationServices";
import NotificationServices from "./Domain/Services/NotificationServices";
import INotificationCommand from "./Infrastructure/Interfaces/INotificationCommand";
import NotificationCommand from "./Infrastructure/Command/NotificationCommand";
import INotificationQuery from "./Infrastructure/Interfaces/INotificationQuery";
import NotificationQuery from "./Infrastructure/Query/NotificationQuery";
// import passport from "./Infrastructure/Config/Passport";

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
            origin: "http://localhost:3009" 
        },
        maxHttpBufferSize: 4e6 // 4Mb
    });

const notificationCommand: INotificationCommand = new NotificationCommand();
const chatQuery: INotificationQuery = new NotificationQuery();
const chatServices: INotificationServices = new NotificationServices(notificationCommand, chatQuery);

// Deberia utilizar el tipo correcto
// io.engine.use((req: any, res: any, next: any) => {
//     const isHandshake = req._query.sid === undefined;
//     if (isHandshake) {
//         passport.authenticate("jwt", { session: false })(req, res, next);
//     } else {
//         next();
//     }
// });

io.on('connection', function (socket) {
    console.log('A user connected');
    const user = socket.request.user;
    if(user)
        {
            console.log('User id: ', user.id);
        }      
})

// Iniciamos el servidor en el puerto 3003
server.listen(PORT, function () {
    console.log(`Servidor iniciado en http://localhost:${PORT}`)
})