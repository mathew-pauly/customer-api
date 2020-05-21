import {MongoClient, Db} from 'mongodb';
import { IDbConnection } from '../idatabase';
import { injectable, inject } from "inversify";
import {ILogger} from '../../config/logger/ilogger';
import { TYPES } from '../../constants/types';
import * as dotenv from "dotenv";
import * as trace from 'stack-trace';
import { CloudEnvironment } from '../../constants/default';
@injectable()
export class DbConnection implements IDbConnection{
    public static readonly TARGET_NAME: string = "DbConnection"; 
    private instance = 0;
    clientMap = new Map();
    constructor(
        @inject(TYPES.Logger) private readonly log: ILogger){
            this.log.setName(DbConnection.TARGET_NAME);
    }

    connect=async() => {
        try {
            const options = { useNewUrlParser: true, ignoreUndefined: true, useUnifiedTopology: true }; 
            const env = dotenv.config({ path: "environment/.env.prod" });
            const host = env.parsed[CloudEnvironment.MONGODB_HOST];
            const port = Number.parseInt(env.parsed[CloudEnvironment.MONGODB_PORT]);
            const username = env.parsed[CloudEnvironment.MONGODB_USERNAME];
            const passkey = env.parsed[CloudEnvironment.MONGODB_PASSKEY];
            const db = env.parsed[CloudEnvironment.MONGODB_DB];
            const uri=`mongodb+srv://${username}:${passkey}@${host}/${db}`;
            console.log(uri)
            const _db = await MongoClient.connect(uri,options);
            return _db.db(db);
        } catch (e) {
            this.log.error(e.message, trace.get());
            throw new Error(`Error on mongodb connection: customerdb`);
        }  
    }

    getDB=async() => {
        try {
            this.instance++;     // singleton instance called count.
            this.log.info(`DbConnection called ${this.instance} times`, trace.get());
            if(!this.clientMap.has('db')){
                this.log.info(`Creating connection for customerdb`, trace.get());
                this.clientMap.set('db', await this.connect());              
            } else{
                this.log.info(`Reusing connection for customerdb`, trace.get())
            }
            return this.clientMap.get('db');
        } catch (e) {
            return e;
        }  
    }
}
