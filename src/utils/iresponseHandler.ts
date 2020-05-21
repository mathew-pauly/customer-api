
export interface IResponseHandler {
    OK(_this, message, data, sendFile?);
    INTERNAL_SERVER(_this, message, error?);
    NOT_FOUND(_this, message);
}
