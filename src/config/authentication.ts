import * as express from 'express';
import { AuthFilters } from './../constants/default';


export type res = { status: number; message: string };
export function expressAuthentication(req: express.Request, securityName: string, scopes?: string[]): Promise<any> {
  switch (securityName) {
    case AuthFilters.BASIC_AUTH:
      return Promise.resolve({});   
    default:
      return Promise.reject({});
  }
}
