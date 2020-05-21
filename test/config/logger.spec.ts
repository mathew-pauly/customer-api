import 'mocha';
import 'reflect-metadata';
import * as chai from 'chai'; 
import chaiAsPromised = require('chai-as-promised');
import { Logger } from '../../src/config/logger/logger';
import * as dotenv from "dotenv";
import * as SplunkLogger from "splunk-logging";
import * as httpContext from 'express-http-context';
import { RequestHeaders } from '../../src/constants/default';
import { ILogger } from '../../src/config/logger/ilogger';

const sinon = require('sinon');
const expect = chai.expect;
const assert = chai.assert;
chai.use(chaiAsPromised);

describe('Logger', () => {
    let sandbox, loggerInfo: ILogger;
    let stackTrace =[{getTypeName:()=>{},getLineNumber:()=>{}, getMethodName:()=>{}}]

    let header = {
        providerId: '123456',
        tenantId: 'TT',
        userId: 'test',
    };
    header["X-Pep-TraceId"] = '0000';
    global["custom"] = {};
    beforeEach(() => {
        sandbox = sinon.createSandbox();

        sandbox.stub(dotenv,'config').returns({parsed:{}});
        loggerInfo  = new Logger();
        sandbox.stub(SplunkLogger,'Logger').returns({error:()=>{},send:()=>{}});
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('set name',async()=>{
        const result = await loggerInfo.setName('Test Case');
    })

    it('configLogger method', async () => {
        const results = await loggerInfo.configLogger();
    });

    it('set info log message', async () => {
        await loggerInfo.info('Info',stackTrace,'testMethod');
        assert.isFunction(loggerInfo.info);
    });


    it('set error log message', async () => {
        stackTrace[0].getMethodName=()=>{ return 'error'};
        await loggerInfo.error('errorInfo',stackTrace,'testMethod');
        assert.isFunction(loggerInfo.error);
    });

    it('set error log message without stacktrace', async () => {
        await loggerInfo.error('errorInfo',null,'testMethod');
        assert.isFunction(loggerInfo.error);
    });


})
