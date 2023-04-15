import React, { useState,lazy } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/header.scss"
import {BASE_URL} from 'coreApp/constants/apiConstants';
import { useSelector } from 'react-redux';
import * as userSlice from 'store/slices/userSlice';
import { Logout} from 'coreApp/ssoLogin';
const Button = lazy(() => import('pages/coreUI/common/_button'));
const Image = lazy(() => import('pages/coreUI/common/_image'));
const LeftMenu = lazy(() => import('layout/leftMenu'));

function HeaderPage(props) {
    const [isHamburgerMenu, setIsHamburgerMenu] = useState(false);
    const navigate = useNavigate();
    const userData = useSelector(userSlice?.selectUserData);
    let profileUser = userData?.firstName ? userData?.firstName: "User";
    const actionHandler = (actionType, data) => {
        props?.sendDataToGTM('clicked', `hamburgerMenu_${actionType}`, props?.PB_MY_ACCOUNT_GA_CATEGORY) 
        switch(actionType){
            case "app-store"   : props?.redirectToPage(BASE_URL?.APP_STORE, '_blank'); break;
            case "google-play" : props?.redirectToPage(BASE_URL?.GOOGLE_PLAY, '_blank'); break;
            case "Login"       : Logout(true);  break;  // logout then login method
            default            : navigate(actionType);
        }
    }
    
    return (
        <div className="headerContainer">
            <header className="headerWrapper">
                <div className="LogoContainer">
                    <div className="hamburger_icon_parent" onClick={() => {setIsHamburgerMenu(!isHamburgerMenu); props?.sendDataToGTM('clicked', `hamburgerMenu_${isHamburgerMenu ? "hide":"show"}`, props?.PB_MY_ACCOUNT_GA_CATEGORY) }}>
                        <span className="ti-align-left"></span>
                    </div>
                    <Image onClick={()=>actionHandler("/home")}  src={`${props?.IMAGE_URL}header/logo.svg`} className="logo" height={"32px"} width={"179px"} alt="logo" />
                </div>
                <div className="actionContainer">
                    { userData?.customerId 
                       ? <Button
                            className="profileUser"
                            btnClickHandler={()=>actionHandler("/my-profile")}
                            buttonText={profileUser?.length > 10 ? `${profileUser?.substring(0, 10)}...` : profileUser }
                            btnLeftIcon
                            btnLeftIconSrc={`${props?.IMAGE_URL}header/profileUser.svg`}
                            imgWidth={"16px"}
                            imgHeight={"16px"}
                        />
                        : <Button 
                                btnClickHandler={()=>actionHandler("login")} 
                                className="login _button"
                                buttonText={"Login"}
                            />
                    }
                    
                </div>

                {isHamburgerMenu &&
                    <div className={`hamburgerMenu ${isHamburgerMenu ? "active" : ""}`}>
                    <div className={"overlay"} onClick={() => setIsHamburgerMenu(!isHamburgerMenu)}></div>

                    <div className={"hamburgerMenuHeader"}>
                        <div className={"logoContainer"}>
                            <div className={"pageTagWrapper"}>
                                <Image src={`${props?.IMAGE_URL}header/logo.svg`} onClick={()=>actionHandler("logo")} className={"logo"} height={"24px"} width={"112px"} alt="logo" />
                            </div>
                            <div className="ti-close closeIcon" onClick={() => setIsHamburgerMenu(!isHamburgerMenu)} />
                        </div>
                    </div>

                      <LeftMenu linkClickHandler={() => setIsHamburgerMenu(!isHamburgerMenu)} {...props} isHamburgerMenu={isHamburgerMenu} className={`hamburgerMenuList`} />
                      <div className = "hamburgerMenuFooter">
                            <div className="infoText">Get the codehub guru App and browser faster</div>
                            <div className='appIcon'>
                                <Image height="26px" width="95px" src={`${props?.IMAGE_URL}header/google-play.svg`} alt='google-play' className='google-play' onClick={()=>actionHandler('google-play')} />
                                <Image height="26px" width="95px" src={`${props?.IMAGE_URL}header/app-store.svg`} alt='app-store'  className='app-store' onClick={()=>actionHandler('app-store')} />
                            </div> 
                      </div>
                    </div>
                }
            </header>
        </div>
    )
}

export default HeaderPage