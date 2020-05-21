import 'mocha';
import 'reflect-metadata';
import { assert } from 'chai'; 
import ResponseHandler from '../../src/utils/impl/responseHandler';
const sinon = require('sinon');
import { STATUS_CODE } from '../../src/constants/default';
import { ILogger } from '../../src/config/logger/ilogger';

describe('Utitlies', () => {
    let sandbox;
    let responseHandler;
    let instance;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
        responseHandler = new ResponseHandler();
        // mock instance
        const logger = <ILogger>{};
        logger.info = sandbox.stub();
        logger.error = sandbox.stub();
        instance = {
            log : logger
        };
        instance.setStatus = sandbox.stub();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Check OK response', async () => {
        const response = responseHandler.OK(instance, "Ok Success", null);
        assert.equal(response.status, STATUS_CODE.OK)
    });
    it('Check OK response with sendFile', async () => {
        const data = "data";
        const response = responseHandler.OK(instance, "Ok Success", data, true);
        assert.equal(response, data);
    });
    it('Check INTERNAL_SERVER response', async () => {
        const response = responseHandler.INTERNAL_SERVER(instance, "Internal Server", null);
        assert.equal(response.status, STATUS_CODE.SERVER_ERROR)
    });
    it('Check NOT_FOUND response', async () => {
        const response = responseHandler.NOT_FOUND(instance, "Not Found", null);
        assert.equal(response.status, STATUS_CODE.NOT_FOUND)
    });
});
