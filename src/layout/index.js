/* eslint-disable react-hooks/exhaustive-deps */
import React, { lazy, Suspense,useEffect } from "react";
import { getCurrentURL } from "coreApp/utility";
import {useNavigate } from "react-router-dom";
import { getData,setData,getKey} from 'coreApp/localstorage';
import {USER_DATA,UTM_DATA} from 'coreApp/constants/apiConstants';
import * as userSlice from 'store/slices/userSlice';
import { useDispatch, useSelector } from "react-redux";
import "./layout.scss"
import FullPageSkeleton from 'pages/coreUI/skeletonLoader/FullPageSkeleton';
const Header = lazy(() => import('./header'));
const Footer = lazy(() => import('./footer'));
function Layout(props) {
    let navigateTo     = useNavigate();
    const { leftMenu = false, activeURL = getCurrentURL()} = props;
    const dispatch = useDispatch();
    const userData = useSelector(userSlice?.selectUserData);
    const utmData = useSelector(userSlice?.selectUtmData);
    useEffect(() => { 
        init();
    },[]);

    const init=()=>{
        getData(USER_DATA).then((data) => { 
            let user_Data      = {...data,...userData};
            dispatch(userSlice?.setUserData(user_Data));
            getKey("activeLeftMenu").then((activeLeftMenu) => {
                if(activeLeftMenu){
                    return navigateTo(activeLeftMenu);
                }else{
                    return navigateTo("/home")
                }
            });
        });
        getData(UTM_DATA).then((data) => {
            const urlParams = new URLSearchParams(window.location.search);
            let UTMParams = {
                ...data,
                ...utmData,
                utmSource : data?.utmSource  || "direct"
            };
            if(urlParams){
                if(urlParams.get('utm_content')){ UTMParams["utmContent"] = urlParams.get('utm_content')}
                if(urlParams.get('utm_medium')){ UTMParams["utmMedium"] = urlParams.get('utm_medium')}
                if(urlParams.get('utm_source')){ UTMParams["utmSource"] = urlParams.get('utm_source')}
                if(urlParams.get('utm_name')){ UTMParams["utmName"] = urlParams.get('utm_name')}
                if(urlParams.get('utm_term')){ UTMParams["utmTerm"] = urlParams.get('utm_term')}
                if(urlParams.get('utm_title')){ UTMParams["utmTitle"] = urlParams.get('utm_title')}
                if(urlParams.get('utm_campaign')){ UTMParams["utm"] = urlParams.get('utm_campaign')}
                if(urlParams.get('data_source')){ UTMParams["dataSource"] = urlParams.get('data_source')}
                if(urlParams.get('source')){ UTMParams["source"] = urlParams.get('source')}
            }
            setData(UTM_DATA,UTMParams);
            return dispatch(userSlice?.setUtmData(UTMParams));
        });
    }
    
    return (
        <Suspense fallback={<FullPageSkeleton />}>
            <div className={`${getCurrentURL()} wrapperLayout`}>
                <Header {...props} />
                <div className={`${leftMenu ? "" : "fullPage"} mainContainerLayout`} id='mainContainerLayout'>
                  <div className="mainContentSection" >{props.children} </div>
                </div>
                <Footer {...props} />
            </div>
        </Suspense>
    )
}
export default Layout