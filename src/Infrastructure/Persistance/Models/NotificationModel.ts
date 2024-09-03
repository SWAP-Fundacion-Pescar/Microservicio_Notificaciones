import mongoose, { Schema } from "mongoose";
import INotificationDocument from "../../Interfaces/INotificationDocument";

const notificationSchema: Schema<INotificationDocument> = new mongoose.Schema(
    {   userId: {type: String, required: true},
        isRead: {type: Boolean, default: false},
        receivedAt: {type: Date},
        createdAt: {type: Date, default: Date.now()},
        content: {type: String, required: true},
        hasImage: {type: Boolean, default: false},
    });
const NotificationModel = mongoose.model('NotificationModel', notificationSchema);
export default NotificationModel;