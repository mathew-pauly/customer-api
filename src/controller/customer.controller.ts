import { TYPES } from "../constants/types";
import { Body, Controller, Get, Header, Path, Post, Query, Route, SuccessResponse,Tags,Security } from 'tsoa';
import { ProvideSingleton, inject} from "../config/inversify.config";
import { ILogger } from "../config/logger/ilogger";
import { CUSTOMER_MSG } from "../constants/default";
import { IResponseHandler } from "../utils/iresponseHandler";
import * as trace from 'stack-trace';
import { ICustomerService } from "../service/icustomer.service";
@ProvideSingleton(CustomerController)
@Route("/customer")
@Tags('Customer')
@Security('basicAuth')
export class CustomerController extends Controller{
    public static TARGET_NAME = "CustomerController";   
    constructor(
        @inject(TYPES.Logger) private readonly log: ILogger,
        @inject(TYPES.CustomerService) private readonly customerService: ICustomerService,
        @inject(TYPES.ResponseHandler) private readonly responseHandler: IResponseHandler) {
            super();
            this.log.setName(CustomerController.TARGET_NAME);   
    }

    @Get("/")
    public async getAllCustomers(){
        try{
            this.log.info(CUSTOMER_MSG.REQUEST_START, trace.get(), 'getAllCustomers');
            const value = await this.customerService.getAll();
            return this.responseHandler.OK(this, CUSTOMER_MSG.REQUEST_SUCCESS, value);
        } catch(err){
            return this.responseHandler.INTERNAL_SERVER(this,CUSTOMER_MSG.REQUEST_END, err.message);
        }
    }

    @Get("/{id}")
    public async getCustomerById(@Path('id') customerId: string){
        try{
            this.log.info(CUSTOMER_MSG.REQUEST_START, trace.get(), 'getCustomerById');
            const value = await this.customerService.getById(customerId);
            return this.responseHandler.OK(this, CUSTOMER_MSG.REQUEST_SUCCESS, value);
        } catch(err){
            return this.responseHandler.INTERNAL_SERVER(this,CUSTOMER_MSG.REQUEST_END, err.message);
        }
    }
}
