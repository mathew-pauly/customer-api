/**
 * Constant variables are declared here
 */

export const CloudEnvironment = {
	ENVIRONMENT : "env",
	APP_NAME : "app.name",
	HOST_NAME : "host.name",

	MONGODB_HOST: "mongodb.host",
	MONGODB_PORT: "mongodb.port",
	MONGODB_USERNAME: "mongodb.username",
	MONGODB_PASSKEY: "mongodb.passkey",
	MONGODB_DB:"mongodb.db",
	
	LOGGER_PATH: "logger.path",
	LOGGER_LEVEL: "logger.level",

	SERVER_PORT: "server.port",

	TENANTIDS: "tenants",
}

export const AuthFilters = {
	BASIC_AUTH: "basicAuth"
}


export const RequestHeaders = {
	CONTEXT: "context",
	USERINFO: "userInfo",
	USER_AGENT: "user-agent",
	SERVICENAME : "servicename"
}

export const CUSTOMER_MSG = {
	REQUEST_START: "Request Started",
	REQUEST_SUCCESS: "Request Success",
	REQUEST_END: "Request Completed",
	FAILED: "Request Failed"
}

export enum LOG_STATUS{
	START = "START:: ",
	END = "END:: "
}

export enum STATUS_CODE {
	OK = 200,
	NOT_FOUND = 404,
	BAD_REQUEST = 400,
	SERVER_ERROR = 500,
	UNAUTHORIZED = 401
}