
export interface IMongoRepository {
    find(schema:string, filter:any, select: any, sort?:any, limit?:any);
}
