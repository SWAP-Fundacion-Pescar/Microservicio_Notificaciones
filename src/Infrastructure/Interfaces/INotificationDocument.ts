import { Document } from "mongoose"

interface INotificationDocument extends Document{
    userId: string;
    isRead: boolean;
    receivedAt: Date;
    createdAt: Date;
    content: string;
    hasImage: boolean;
    type: string;
}
export default INotificationDocument;