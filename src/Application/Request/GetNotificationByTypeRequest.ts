class GetNotificationByTypeRequest{
    userId: string; 
    type: string;
    constructor(userId:string, type:string){
        this.userId=userId;
        this.type=type;
    }
}
export default GetNotificationByTypeRequest;