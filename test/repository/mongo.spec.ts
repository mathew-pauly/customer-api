import 'mocha';
import 'reflect-metadata';
import { assert } from 'chai'; 
import { ILogger } from './../../src/config/logger/ilogger';
import { IMongoRepository } from './../../src/repository/imongo';
import { IDbConnection } from '../../src/adapter/idatabase';
import { MongoRepository } from '../../src/repository/impl/mongo';
import { COLLECTIONS } from '../../src/constants/collections';
import { Customers } from './../json/customer.json';
const sinon = require('sinon');

describe('Mongo Respository', () => {
    let sandbox;
    let mongoRepository: IMongoRepository;
    const tenantId: string = 'MT';
 
    beforeEach(() => {

        sandbox = sinon.createSandbox();
        
        const dbMock = {   
            collection: function () {
                return this;
            }, 
            
            find: function () {
                return this;
            },
            project:function () {
                return this;
            },
            sort: function () {
                return this;
            },
            limit: function () {
                return this;
            },
            toArray: function () {
                return Customers;
            }
        };

        //Mock IDbConnection
        let _dB = <IDbConnection>{};
        _dB.getDB = sandbox.stub().returns(dbMock);

        // //Mock ILogger
        let loggerService = <ILogger>{};
        loggerService.setName = sandbox.stub();
        loggerService.info = sandbox.stub();

        mongoRepository  = new MongoRepository(loggerService, _dB);
    });

    afterEach(() => {
        sandbox.restore();
    });


    it('mongo find', async () => {
        const results = await mongoRepository.find(COLLECTIONS.CUSTOMER.name, {}, {});
        assert.equal(results.length, Customers.length);
    });


});
