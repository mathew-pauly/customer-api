
export interface ILogger {
    configLogger():any;
    setName(name: string):any;
    info(message: string, trace?: any, method?: string):any;
    error(message: string, trace?: any, method?: string):any;
    setLogger(type:any, logmsg: string,header:any):any;
}

