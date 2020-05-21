import { injectable, inject } from "inversify";
import { ICustomerService } from "../icustomer.service";
import { TYPES } from "../../constants/types";
import { ILogger } from "../../config/logger/ilogger";
import { IMongoRepository } from "../../repository/imongo";
import { LOG_STATUS, STATUS_CODE, CUSTOMER_MSG } from "../../constants/default";
import { COLLECTIONS } from "../../constants/collections";
import * as trace from 'stack-trace';
@injectable()
export class CustomerService implements ICustomerService{
    public static TARGET_NAME = "FeinService";
    constructor( @inject(TYPES.Logger) private readonly log: ILogger,
        @inject(TYPES.Mongo) private readonly repository: IMongoRepository){
        this.log.setName(CustomerService.TARGET_NAME);
    }

    getAll=async()=>{
        try{
            this.log.info(`Fetching customer list`, trace.get(), "getAll");
            const result =  await this.repository.find(COLLECTIONS.CUSTOMER.name,{},{});
            return result;
        } catch (e) {
            this.log.error(`Error on fetching customer list: ${e.message}`, trace.get(), "getAll");
        }
        return CUSTOMER_MSG.FAILED;
    }

    getById=async(id: String)=>{
        try{
            const result =  await this.repository.find(COLLECTIONS.ADDRESS.name,{customerId:id},{});
            return result;
        } catch (e) {
            this.log.error(`Error on fetching customer ${id} : ${e.message}`, trace.get(), "getById");
        }
        return CUSTOMER_MSG.FAILED;
    }
}
