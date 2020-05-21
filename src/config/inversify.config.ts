import { inject, interfaces, decorate, injectable } from "inversify";
import { TYPES } from '../constants/types';
import { Controller } from 'tsoa';
import { autoProvide, makeProvideDecorator, makeFluentProvideDecorator } from 'inversify-binding-decorators';
import 'reflect-metadata';

//Services
import { ICustomerService } from "../service/icustomer.service";
import { CustomerService } from "../service/impl/customer.service";

//Database
import { IMongoRepository } from "./../repository/imongo";
import { MongoRepository } from "./../repository/impl/mongo";
import { IDbConnection } from "./../adapter/idatabase";
import { DbConnection } from "./../adapter/impl/database";

//Common
import { ILogger } from "./logger/ilogger";
import { Logger } from "./logger/logger";
import { IResponseHandler } from "../utils/iresponseHandler";
import ResponseHandler from "../utils/impl/responseHandler";
import { iocContainer } from "./ioc";


decorate(injectable(), Controller);
type Identifier = string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>;

const provide = makeProvideDecorator(iocContainer);
const fluentProvider = makeFluentProvideDecorator(iocContainer);

const ProvideNamed = (identifier: Identifier, name: string) => fluentProvider(identifier).whenTargetNamed(name).done();

const ProvideSingleton = (identifier: Identifier) => fluentProvider(identifier).inSingletonScope().done();

//Common Binding
iocContainer.bind<ILogger>(TYPES.Logger).to(Logger);
iocContainer.bind<IResponseHandler>(TYPES.ResponseHandler).to(ResponseHandler).inSingletonScope();

//Database Binding
iocContainer.bind<IDbConnection>(TYPES.DB).to(DbConnection).inSingletonScope();
iocContainer.bind<IMongoRepository>(TYPES.Mongo).to(MongoRepository);

//Services Binding
iocContainer.bind<ICustomerService>(TYPES.CustomerService).to(CustomerService);

export { iocContainer, autoProvide, provide, ProvideSingleton, ProvideNamed, inject, decorate, injectable };
