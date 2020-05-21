import { injectable, inject } from "inversify";
import {TYPES} from '../../constants/types';
import {ILogger} from '../../config/logger/ilogger';
import {IMongoRepository} from '../imongo';
import { IDbConnection } from '../../adapter/idatabase';
import * as trace from 'stack-trace';
@injectable()
export class MongoRepository implements IMongoRepository{
    public static readonly TARGET_NAME: string = "MongoRepository";
    
    constructor(
        @inject(TYPES.Logger) private readonly log: ILogger, 
        @inject(TYPES.DB) private readonly _db: IDbConnection) {       
            this.log.setName(MongoRepository.TARGET_NAME);  
    }

    _getDB=async()=>{
        this.log.info(`Connecting DB`, trace.get())
        return this._db.getDB();
    }


    find = async(schema:string, filter:any, select: any, sort?:any, limit?:number)  => {
        try {
            if(!sort){
                sort = {};
            }
            if(!limit){
                limit = 0;
            }
            const db = await this._getDB();
            return await db.collection(schema).find(filter).project(select)
            .sort(sort)
            .limit(limit)
            .toArray();
        } catch (err) {
            throw err;
        }
    }

}

