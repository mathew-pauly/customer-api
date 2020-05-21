import { assert } from 'chai'; 
import { IMongoRepository } from "../../src/repository/imongo";
import { ILogger } from "../../src/config/logger/ilogger";
import { CustomerService } from '../../src/service/impl/customer.service';
import { Customers } from './../json/customer.json';
import { Address } from './../json/address.json';
const sinon = require('sinon');


describe('Customer Service', () => {
    let sandbox;
    let customerService:CustomerService;
    let mongoRepository;
    beforeEach(() => {
        sandbox = sinon.createSandbox();

         //Mock IMongoRepository
         mongoRepository = <IMongoRepository>{};
         mongoRepository.find = sandbox.stub().returns();
 
         //Mock ILogger
         let loggerService = <ILogger>{};
         loggerService.setName = sandbox.stub();
         loggerService.error = sandbox.stub();
         loggerService.info = sandbox.stub();


         customerService = new CustomerService(loggerService, mongoRepository);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Get All Success',async() => {
        mongoRepository.find = sandbox.stub().returns(Customers);
        const response = await customerService.getAll();
        assert.equal(response.length, 4);
    });

    it('Get By Id Success',async() => {
        mongoRepository.find = sandbox.stub().returns(Address);
        const response = await customerService.getById('1111');
        assert.equal(response.length, 2);
    });

});