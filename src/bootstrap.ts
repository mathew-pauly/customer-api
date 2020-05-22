import * as http from 'http';
import * as cors from "cors";
import * as helmet from "helmet";
import * as dotenv from "dotenv";
import * as httpContext from 'express-http-context';
import * as compression from 'compression';
import * as swaggerUi from 'swagger-ui-express';
import {iocContainer} from './config/inversify.config';
import * as morgan from 'morgan';
import { TYPES } from './constants/types';
import { ILogger } from './config/logger/ilogger';
import * as express from "express";
import './controller/customer.controller';
import { RegisterRoutes } from './routes';
import * as methodOverride from 'method-override';
import * as swaggerDocument from './swagger.json';
import * as trace from 'stack-trace';

//@injectable()
export class Server{
    public TARGET_NAME = "Server";
    port:any;
    server: any;

    log:ILogger = iocContainer.get<ILogger>(TYPES.Logger);


    constructor(){
        this.log.setName(this.TARGET_NAME); 
        this.log.configLogger();
        this.port = process.env.PORT;
        this.init();
        
    }

    init(){
        const app: express.Express = express();
        this.handleExceptions();
        // create server
        // const logger = morgan('combined')
        // app.use(logger);
        // add body parser
        app.use(express.urlencoded({
            extended: true
        }));
        app.use(express.json());
        app.use(httpContext.middleware);
        app.use(cors());
        app.use(compression());
        app.use(helmet());
        app.use(methodOverride());
        RegisterRoutes(app);

        app.use((err, req, res, next) => {
            this.log.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`, trace.get());
            res.status(err.status || 500).send(err.message || 'An error occurred during the request.');
        });
        app.set('port', this.port);
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        this.server = http.createServer(app);
        this.server.listen(this.port);
        this.server.on('error', this.onError.bind(this));
        this.server.on('listening', this.onListening.bind(this));   
    }

    private handleExceptions(){
        process.on('uncaughtException', (ex) => {
            this.log.error(`uncaught exception : ${ex.message}`, trace.get(), 'uncaughtException');
            process.exit(0);
        });

        process.on('SIGINT', () => {
            this.log.error(' process exiting ', trace.get(), 'SIGINT');
            process.exit(0);
        });

        process.on('SIGTERM', () => {
            this.log.error(' process exiting ', trace.get(), 'SIGTERM');
            process.exit(0);
        });

        process.on('unhandledRejection', (error: any) => {
            this.log.error(`unhandledRejection: ${error.message}`, trace.get(), 'unhandledRejection');
          });
    }

    private onListening() {
        const addr = this.server.address();
        this.log.info(`Server started running on ${addr.address} ${addr.port}`, trace.get());
    }

    private onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') {
            throw error;
        }
        const bind = (typeof this.port === 'string') ? `Pipe ${this.port}` : `Port ${this.port}`;
        switch (error.code) {
            case 'EACCES':
                this.log.error(`${bind} requires elevated privileges`, trace.get());
                process.exit(1);
                break;
            case 'EADDRINUSE':
                this.log.error(`${bind} is already in use`, trace.get());
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
}

export default new Server();
