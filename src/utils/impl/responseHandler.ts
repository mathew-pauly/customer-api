import { injectable } from "inversify";
import { ExpressResponse } from "../../model/express-response.model";
import { IResponseHandler } from "./../iresponseHandler";
import { LOG_STATUS, STATUS_CODE } from "../../constants/default";
import * as trace from 'stack-trace';
@injectable()
export default class ResponseHandler implements IResponseHandler{
    public static readonly TARGET_NAME: string = "ResponseHandler"; 
    constructor() { }

    OK(_this, message, data, sendFile = false) {
        const _response = new ExpressResponse(message, STATUS_CODE.OK, data);
        _this.log.info(`${LOG_STATUS.END} ${message}`,trace.get(),"OK");
        _this.setStatus(_response.status);
        if (sendFile) {
            return data;
        } else {
            return _response;
        }
    }

    INTERNAL_SERVER(_this, message, error?) {
        const _response = new ExpressResponse(message, STATUS_CODE.SERVER_ERROR, error);
        _this.log.error(`${LOG_STATUS.END} ${message}`,trace.get(), "INTERNAL_SERVER");
        _this.setStatus(_response.status);
        return _response;
    }

    NOT_FOUND(_this, message) {
        const _response = new ExpressResponse(message, STATUS_CODE.NOT_FOUND);
        _this.log.error(`${LOG_STATUS.END} ${message}`, trace.get(), "NOT_FOUND");
        _this.setStatus(_response.status);
        return _response;
    }

}
