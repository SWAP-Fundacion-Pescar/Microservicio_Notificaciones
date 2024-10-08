class Notification {
    id?: string
    userId: string
    isRead: boolean
    receivedAt: Date
    createdAt: Date
    content: Object 
    message: string
    type: string
    hasImage?: boolean
    constructor(id:string, userId: string, isRead: boolean, receivedAt: Date, createdAt: Date, content: Object, message: string, type: string, hasImage?: boolean){
        this.id = id;
        this.userId = userId;
        this.isRead = isRead;
        this.receivedAt = receivedAt;
        this.createdAt = createdAt;
        this.content = content;
        this.message = message;
        this.hasImage = hasImage;
        this.type = type;
    }
}
export default Notification;