import { v4 as uuidv4 } from 'uuid';
import { STORAGE_ENCRYPTION_KEY, STORAGE_ENCRYPTION  } from 'coreApp/constants/apiConstants';
import AES    from "crypto-js/aes";
import enc    from "crypto-js/enc-utf8";

export const uuid = () => {
    return uuidv4()
}

export const getUrlParams = (prop = null) => {
    let params = {};
    let search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 1));
    let definitions = search.split('&');

    definitions.forEach(function (val, key) {
        let parts = val.split('=', 2);
        params[parts[0]] = parts[1];
    });

    return (prop && prop in params) ? params[prop] : params;
};

export const fetchServerErrorFromObject = function (error, errorReference = 'message') {
    return error && error[errorReference]
}

export const getIsMobile = () => {
    const userAgent = navigator === undefined ? 'SSR' : navigator.userAgent
    let currentDevice = [];
    if (userAgent) {
        if (userAgent.match(/Android/i)) currentDevice.push("isAndroid");
        if (userAgent.match(/iPhone|iPad|iPod/i)) currentDevice.push("isIos");
        if (userAgent.match(/IEMobile/i)) currentDevice.push("isWindows");
        if (userAgent.match(/SSR/i)) currentDevice.push("isSSR");
        if (currentDevice.includes('isAndroid') || currentDevice.includes('isIos') || currentDevice.includes('isWindows')) {
            return true
        } 
        return false
    }
}

export const getDeviceType = () => {
    let deviceType = "DESKTOP";
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        deviceType = "MOBILE";
    }
    return deviceType;
}

export const getCurrentURL = (url) => {
    let splitUrl = (url ? url?.split("/") : window.location.pathname)?.split("/");
    return splitUrl[splitUrl.length - 1];
}

export const isEmpty = function (obj) {
    if (obj === undefined || obj === 0 || obj === '0' || obj === false || obj == null || Object.keys(obj)?.length === 0) {
        return true;
    } else if (Object.keys(obj)?.length > 0) {
        return false;
    }
};

export const convertRupee = (rupee, isFloat = true) => {
    let formattedValue = (isFloat && rupee) ? parseFloat(rupee).toFixed(0) : rupee;
    if (formattedValue) {
        let x = formattedValue.toString();
        let afterPoint = '';
        if (x.indexOf('.') > 0) {
            afterPoint = x.substring(x.indexOf('.'), x.length);
            x = Math.floor(x);
            x = x.toString();
        }
        let lastThree = x.substring(x.length - 3);
        let otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers !== '') { lastThree = ',' + lastThree; }
        formattedValue = otherNumbers.replace(/\d{2}(?=\d{2})/g, "$&,") + lastThree + afterPoint;
    }
    return formattedValue;
}

export const maskAccountNumber=(accountNumber)=>{
    let accountNo   = "";
    if(accountNumber){
        accountNo   = accountNumber.slice(0,accountNumber.length-4).replace(/[A-Za-z0-9]/g, "X") + accountNumber.slice(accountNumber.length-4,accountNumber.length); 
    }
    return accountNo   
}

export const masked = (value)=>{
    let valueStartTwoChar   = value?.slice(0, 2);
    let valueLastTwoChar    = value?.slice(-2);
    let maskedValue         = `${valueStartTwoChar}XXXXXX${valueLastTwoChar}`;
    return maskedValue
}

export const emailValidation = (email) => {
    let atPosition = email?.indexOf("@");
    let dotPosition = email?.lastIndexOf(".");
    
    return (email === undefined || atPosition < 1 || dotPosition < atPosition + 2 || dotPosition + 2 >= email.length)
};

export const restrictSpaceSpecial = (e) => {
    let k = e.which;
    if(document?.all){k = e.keyCode}
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32 || (k >= 48 && k <= 57));
}

export const redirectToPage = (link, target = '_blank') => {
    setTimeout(() => {
        window.open(link, target);
    });
}

export const capitalizeFirstLetter = (string) => {
    let letter = string?.toLowerCase()
    if (letter && letter.length) {
        return letter.charAt(0).toUpperCase() + letter.slice(1);
    }
    return string
} 


export const validateEmail = (email) => {
    let at = email?.indexOf("@");
    let dot = email?.lastIndexOf("\\.");
    return email.length > 0 &&
        at > 0 &&
        dot > at + 1 &&
        dot < email?.length &&
        email[at + 1] !== "." &&
        email?.indexOf(" ") === -1 &&
        email?.indexOf("..") === -1;
} 

export const removeAllSpecificCharFromString = (str, reg) => {
    while (reg.test(str)) {
        str = str.replace(reg, '')
    }
    return str
};

export const decryptLocalStorage = (ciphertext) => {
    if (!ciphertext || typeof ciphertext !== "string" || !STORAGE_ENCRYPTION) return ciphertext;
    const bytes = AES.decrypt(ciphertext, STORAGE_ENCRYPTION_KEY);
    const decrypted = bytes.toString(enc);
    return JSON.parse(decrypted);
}

export const encryptLocalStorage = (palinText) => {
    if (!palinText || typeof palinText !== "object" || !STORAGE_ENCRYPTION) return palinText;
    const cryptedText = AES.encrypt(JSON.stringify(palinText), STORAGE_ENCRYPTION_KEY);
    return cryptedText.toString();
}










