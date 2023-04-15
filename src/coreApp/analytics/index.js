import { setData,getData} from 'coreApp/localstorage';
import { CONFIG,GA_COMMON_DATA } from 'coreApp/constants/apiConstants';

export const sendDataToGTM = async (type, label, GACategory="myAccountDashboard", AdditionalParams) => {
    let GACommonData = await getData(GA_COMMON_DATA);
    let gaAdditionalParams = { ...GACommonData, ...AdditionalParams };
    gaAdditionalParams['category'] = GACategory;
    gaAdditionalParams['label'] = label;
    gaAdditionalParams['lob'] = "Web";
    gaAdditionalParams['utm_source'] = "";
    gaAdditionalParams['platform'] = "Web";

    switch (type) {
        case "viewed":
            gaAdditionalParams['action'] = 'viewed';
            gaAdditionalParams['event'] = 'virtualPageview';
            break;
        case "clicked":
            gaAdditionalParams['action'] = "clicked";
            gaAdditionalParams['event'] = "buttonClick";
            break;
        default: break;
    }
    if (!CONFIG?.GA?.SWITCH) {
        return false;
    } else{
        window?.dataLayer?.push(gaAdditionalParams);
    }
};


export const setGAAdditionalData=(data)=>{ 
    let GACommonData={};
    if(data){
        GACommonData['visitId']       = data?.visitId || null;
        GACommonData['visitorId']     = data?.visitorId || null;
        GACommonData['PageLanguage']  = 'en';
        GACommonData['userId']        = data?.userId || null;
        GACommonData['customerId']    = data?.customerId || null;           
        GACommonData['utmData']       = data?.utmData || null;   
        GACommonData['userType']      = data?.userType || null; 
        GACommonData['page']          = window.location.pathname === "/" ? "/dashboard" : window.location.pathname || null;
        GACommonData['device']        = window.innerWidth >= 768 ? "desktop" : "mobile"; 
    }
    setData(GA_COMMON_DATA, GACommonData); 
}
