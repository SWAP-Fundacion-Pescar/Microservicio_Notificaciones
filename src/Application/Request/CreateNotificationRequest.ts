class CreateNotificationRequest{
    userId: string;
    content: string;
    hasImage?: boolean;
    constructor(userId: string, content: string, hasImage?: boolean){
        this.userId=userId;
        this.content=content;
        this.hasImage=hasImage;
    }
}
export default CreateNotificationRequest; 