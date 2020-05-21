const TYPES = {
    Mongo: Symbol.for("MongoRepository"),
    DB: Symbol.for("DbConnection"),
    Logger: Symbol.for("Logger"),
    Middleware: Symbol.for("Middleware"),
    ResponseHandler: Symbol.for("ResponseHandler"),
    CustomerService: Symbol.for("CustomerService"),
};
 
export { TYPES };
