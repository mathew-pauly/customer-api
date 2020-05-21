export class ExpressResponse {

    constructor(message:string,status:number,payload?:any) {
        this.message = message ? message : undefined;
        this.status = status ? status : undefined;
        this.payload = payload ? Object.keys(payload).length ? payload:undefined : undefined;
    }

    message;
    status;
    payload;
}