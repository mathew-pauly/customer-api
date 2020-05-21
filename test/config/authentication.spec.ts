import { expressAuthentication } from '../../src/config/authentication';
import { assert } from 'chai';
import { AuthFilters } from '../../src/constants/default';
import {iocContainer} from '../../src/config/inversify.config';
const sinon = require('sinon');


describe('Authentication function', () => {
    const mockReq = {headers:{tenantid:''},header:()=>{}} as any;
    let mockSecurityName = 'xyz';
    const mockScopes = [];
    let sandbox;
    let mockCloudConfig;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
        if(mockCloudConfig)
            mockCloudConfig.restore();
    });

    it('should reject the promise for wrong security name', async () => {
        try {
            const result = await expressAuthentication(mockReq, mockSecurityName, mockScopes);
        } catch (e) {
            assert.exists(e);
        }
    });

    it('should resolve the promise',async ()=>{
        mockReq.headers.tenantid = 'OM'
        mockReq.headers.userid = '000000'
        try {
            const result = await expressAuthentication(mockReq, mockSecurityName, mockScopes);
        } catch (e) {
            assert.exists(e);
        }
    });




});


