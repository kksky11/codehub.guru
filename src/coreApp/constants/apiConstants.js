let hostProdURL        = [""];
let envMod             = hostProdURL?.includes(window.location.hostname) ? "production" : "development";
let configFile         = require( `coreApp/config/config.${envMod}.json`);
let siteHostname       = (envMod === 'development') ? '' : window.location.hostname;


export const CRM_AGENT                  = "crmAgent";
export const HOST_URL                   = siteHostname || "";
export const CONFIG                     = configFile
export const ELIGIBLE_USER              = CONFIG?.ELIGIBLE_USER;
export const DOMAIN                     = CONFIG?.SSO?.DOMAIN;
export const SSO_SWITCH                 = CONFIG?.SSO?.SWITCH || false;
export const MOCK_DATA                  = !SSO_SWITCH || CONFIG?.MOCKAPI || false;
export const GA_SWITCH                  = CONFIG?.GA?.SWITCH || false;
export const STORAGE_ENCRYPTION_KEY     = "anySafeKey";
export const STORAGE_ENCRYPTION         = false;

export const ENV                        = envMod || process.env.NODE_ENV; 
export const HOME                       = CONFIG?.BASE_URL?.HOME;
export const BASE_URL                   = CONFIG?.BASE_URL;
export const IMAGE_BASE_URL             = BASE_URL?.IMAGE_URL; 
export const SESSION_COOKIE_NAME        = "SSO_PB_KEY";
export const USER_DATA                  = "USER_DATA"
export const UTM_DATA                   = "UTM_DATA"
export const GA_COMMON_DATA             = "GA_COMMON_DATA"
export const HTTP_REQUEST_COUNT         = "HTTP_REQUEST_COUNT"

export const MY_ACCOUNT_UTM_SOURCE      = 'UTM_SOURCE';

export const API_URL                = {
    GET_BANK_LIST             : {TIMEOUT:1000, URL:`${BASE_URL?.BSP_URL}/BSP/api/v1/utility/institution/4`},
    GET_CITY_LIST             : {TIMEOUT:1000, URL:`${BASE_URL?.BSP_URL}/BSP/api/v1/utility/city`}
};

export const RETRY_API = {
   
}

export const REDIRECT_URL = {
        
}
export const ACCESS_TOKEN = {
    development : 'ACCESS_TOKEN_DEV',
    production  : 'ACCESS_TOKEN'
};
export const SESSION_AUTH_TOKEN = {
    development : 'SESSION_AUTH_TOKEN_DEV',
    production  : 'SESSION_AUTH_TOKEN' 
};


export const LOCAL_HOST_URL = [""]
