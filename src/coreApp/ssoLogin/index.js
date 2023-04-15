import { uuid,isEmpty,redirectToPage } from 'coreApp/utility';
import { API_URL, USER_DATA, CONFIG } from "coreApp/constants/apiConstants";
import {setSsoCookie,deleteAllCookies } from "coreApp/cookies";
import { setData, getData,setKey,getKey,clearData } from 'coreApp/localstorage';
import { log } from 'coreApp/localLogger';


export function getAuthorizationCode() {
    let payload = {
        authorizationCode: uuid(),
        customerId: uuid()
    }
    //todo: this is {}
    return payload
}

export function getAuthToken(data) {
   //todo: this is true / false
   return true
}
export function Logout(sessionExpired=false) {
    log(`Logout:${sessionExpired}`);
    //todo: this is
    ClearAllData(true);
}
export function ClearAllData(cookies=false) {
    if(cookies){
        deleteAllCookies();
    }else{
        localStorage.removeItem('persist:root')
    }
    clearData();
}

export function isSessionExist() {
    //todo: this is
    return true
}

export async function login() {
    log(`login`);
    let visitId    = await getKey("visitId");
    let userData   = await getData(USER_DATA);
    let additionalData = {};
    if (userData?.mobileNo) {additionalData['mobileNo']=userData?.mobileNo;}
    if(isEmpty(userData?.visitId)){
        let payload = {
            visitId     : uuid(),
            completeUrl : window.location.href,
            createdTime : (new Date()).toString()
        }
        //todo: this is api calling
        setKey("visitId",visitId);
        return true
    }

    if(isSessionExist()){
        return getAuthorizationCode().then((data) => {
            let userData = {...data,visitId};
             getAccessToken(userData);
            }).catch((error) => {
                log(`getAuthToken_error: ${error}`);
                return Logout();
            });
    }else{ 
        //todo: this is
       // createLoginLink(uuid(),{})
    } 
}

export function getAccessToken(userData) {
    setSsoCookie({...userData, accessToken: uuid()});
    setData(USER_DATA, userData).then(() => {
        getKey("activeLeftMenu").then((activeLeftMenu) => {
            if(activeLeftMenu){
                return redirectToPage(activeLeftMenu,'_self')
            }else{
                return redirectToPage('/','_self')
            }
        });
    })
}


