import {ProvideNamed} from "../../src/config/inversify.config";
import { assert } from "chai";

describe('ProvieName',()=>{

    it('should test ProvidedNamed',()=>{

        assert.exists(ProvideNamed('abc','name'));
    });
});
