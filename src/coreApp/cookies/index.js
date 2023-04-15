import { ENV,SESSION_AUTH_TOKEN,DOMAIN,LOCAL_HOST_URL} from 'coreApp/constants/apiConstants';
import { log } from 'coreApp/localLogger';
import moment from 'moment';

export const setCookie = (name, value, days, domain = DOMAIN, milliseconds = false) => {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + ((milliseconds)? days : (days * 24 * 60 * 60 * 1000)));
        expires = "; expires=" + date.toGMTString();
    }
    let cookieData = `${name}=${value}; expires=${expires}; domain=${domain}; path=/`
    log(`setCookie_${name}: ${cookieData}`);
    document.cookie = cookieData;
};

export const setSsoCookie = (ssoData)=>{
    const today  = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;
    let end_date    = moment(ssoData?.accessTokenExpiresAt, 'YYYY-MM-DD HH:mm:ss');
    let start_date  = moment(dateTime, 'YYYY-MM-DD HH:mm:ss');
    let duration    = moment.duration(end_date.diff(start_date));
    if(LOCAL_HOST_URL.includes(window.location.hostname)){
        setCookie(ACCESS_TOKEN[ENV], ssoData?.accessToken, duration._milliseconds, `.${DOMAIN}` , true);
    }
    setCookie(SESSION_AUTH_TOKEN[ENV], ssoData?.accessToken, duration._milliseconds, `.${DOMAIN}`, true);
}

export const getCookie =(name)=>{
    let nameEQ = `${name}=`;
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            let cookieData = c.substring(nameEQ.length, c.length);
            log(`getCookie_${name}: ${cookieData}`);
            return cookieData;
        }
    }
    return null;
};

export const deleteAllCookies=()=>{
    removeCookie(GLSS_TOKEN[ENV]);
    removeCookie(PBGUC[ENV]);
    removeCookie(SESSION_AUTH_TOKEN[ENV]);

    let allCookies = document.cookie.split(';');
  
    for(let value of allCookies){
        document.cookie = value + "=;expires="+ new Date(0).toUTCString();
    }

    localStorage.removeItem('persist:root')
}


export const removeCookie = (name) => {
    setCookie(name, "", -1)
}


