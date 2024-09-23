class CreateNotificationRequest{
    userId: string;
    content: Object;
    message: string;
    type: string;
    hasImage?: boolean;
    constructor(userId: string, content: Object, message: string, type:string, hasImage?: boolean){
        this.userId=userId;
        this.content=content;
        this.message = message;
        this.type = type;
        this.hasImage=hasImage;   
    }
}
export default CreateNotificationRequest; 