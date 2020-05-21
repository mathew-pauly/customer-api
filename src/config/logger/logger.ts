import * as winston from "winston";
import { hostname } from "os";
import * as SplunkLogger from "splunk-logging";
import {ILogger} from './ilogger';
import { injectable } from "inversify";

@injectable()
class Logger implements ILogger{
    public static TARGET_NAME = "Logger";
    name: string;

    constructor() {

    }

    setName(name:string) {
        this.name = name;
    }

    configLogger(){
        const customFormat = winston.format.printf(info => {
            return `${info.message}`;
        });

        const logFormat = winston.format.combine(
            winston.format.timestamp(),
            customFormat
        );

        winston.configure({
            level: 'info',
            format: logFormat,
            transports: [
                new winston.transports.Console({handleExceptions : true})
            ],
            exceptionHandlers: [

            ]
        });

    }

    info=(message: string, trace?: any, method?: string)=> {
        this.setLogger('info', this.getFormattedMessage(message, trace, method));
    }

    error=(message: string, trace?: any, method?: string) =>{
        this.setLogger('error', this.getFormattedMessage(message, trace, method));
    }

    getFormattedMessage=(message:string, stackTrace?: any, method?: any)=>{
        if(stackTrace && stackTrace.length) {
            const trace = stackTrace[0];
            const methodName = trace.getMethodName()? trace.getMethodName() : method;
            return ` class=${trace.getTypeName()} method=${methodName} line=${trace.getLineNumber()} message=${message}`
        }
        return message;

    }

    setLogger=(type:any, logmsg: string)=> {
        let msg =`Date=${new Date(Date.now()).toISOString()}|Level=${type.toString().toUpperCase()}|Class=${this.name}|Message=${logmsg}`;
 
        winston.log.apply(this, [type, msg]);
    }
}

export {Logger}
