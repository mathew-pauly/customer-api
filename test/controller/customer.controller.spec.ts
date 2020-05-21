import 'mocha';
import 'reflect-metadata';
import { assert } from 'chai'; 
import ResponseHandler from '../../src/utils/impl/responseHandler';
import { IResponseHandler } from '../../src/utils/iresponseHandler';
import {Request} from 'express';
import { ILogger } from '../../src/config/logger/ilogger';
import { CustomerController } from '../../src/controller/customer.controller';
import { ICustomerService } from '../../src/service/icustomer.service';

const httpMocks = require('node-mocks-http');

const sinon = require('sinon');

describe('Customer Controller', () => {
    let sandbox;
    let customerController: CustomerController;
    let req: Request;
    beforeEach(() => {
        sandbox = sinon.createSandbox();

        //Mock ILogger
        let loggerService = <ILogger>{};
        loggerService.setName = sandbox.stub();
        loggerService.info = sandbox.stub();
        loggerService.error = sandbox.stub();

        let customerService = <ICustomerService>{};
        customerService.getAll = sandbox.stub();
        customerService.getById = sandbox.stub();



        let responseHandler:IResponseHandler = new ResponseHandler();

        customerController = new CustomerController(loggerService,customerService,responseHandler);
        
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Get All Success', async () => {
        const results: any = await customerController.getAllCustomers();
        assert.equal(results.status, 200);
    });

    it('Get By Id Success', async () => {
        const results: any = await customerController.getCustomerById('1111');
        assert.equal(results.status, 200);
    });
});