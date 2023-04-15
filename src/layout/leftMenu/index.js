import React, { useState, useEffect } from 'react';
import { getCurrentURL } from "coreApp/utility";
import { MY_PRODUCT}     from "coreApp/constants/strings";
import { REDIRECT_URL}   from 'coreApp/constants/apiConstants';
import { useNavigate }   from "react-router-dom";
import "./styles/leftMenu.scss"
import { useSelector, useDispatch } from 'react-redux';
import { setActiveLeftMenu, selectsActiveLeftMenu } from 'store/slices/userSlice';
import {Logout} from 'coreApp/ssoLogin';
import {setKey} from 'coreApp/localstorage';
const LeftMenu = (props) => {
    const dispatch = useDispatch();
    const activeLeftMenu = useSelector(selectsActiveLeftMenu); 
    const navigate = useNavigate();
    const [selectedSideBarMenu, setSelectedSideBarMenu] = useState('/dashboard');
    const [scrolledLeftMenu, setScrolledLeftMenu] = useState('');
    const [leftMenuData, setLeftMenuData] = useState([]);
    
    let activeUrl = getCurrentURL();
    const actionHandler = (actionType, data) => {
        props?.sendDataToGTM('clicked', `${props.isMobile ? "hamburgerMenu_" : "sideMenu_"}${data?.label?.split(' ')?.join('_')}`, props?.PB_MY_ACCOUNT_GA_CATEGORY); //GA Calling
        switch (actionType) {
            case 'dropdown'              : setSelectedSideBarMenu(selectedSideBarMenu === MY_PRODUCT[data?.label]? "" : MY_PRODUCT[data?.label]); break;
            case '/dashboard'            : setSelectedSideBarMenu(actionType); navigate(actionType); break;
            case '/logout'               : Logout(); break;
            default                      : navigate(actionType);break;
        }
        (actionType !== 'dropdown' && props.isHamburgerMenu) && props?.linkClickHandler(); 
    }
    useEffect(() => {
        getLeftMenuData(activeUrl);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeUrl,activeLeftMenu]);

    const handleScroll = () => {
        const headerElement = document.getElementById('mainSidebarSection');
        if (window.scrollY > 50 && headerElement && headerElement.classList != null) {
            setScrolledLeftMenu('scrolledLeftMenu');
        } else {
            setScrolledLeftMenu('');
        }
    }

    const getLeftMenuData = async (url) => {
        import("coreApp/constants/menu/myAccount").then(({ en, hi }) => { setLeftMenuData(en) });
    }



    return (<section className={`mainSidebarSection ${scrolledLeftMenu}`} id="mainSidebarSection">
        <ul className={"_menuList"}>
            {leftMenuData?.map((items, index) => {
                return (
                    <li key={`menuList${index}`} className={`${items.isActive ? "_active" : ""} list`}>
                        <div className={`${items.icon} ${selectedSideBarMenu?.toLowerCase() === items?.link?.toLowerCase() || selectedSideBarMenu?.toLowerCase() === items?.label?.toLowerCase() ? "_active" : ""} ${items.dropdown ? 'arrow' : ""} inner`} onClick={() => actionHandler(items.link, items)}>{items['label']?.toLowerCase()} </div>
                            {items.dropdown &&
                            <ul className={`${selectedSideBarMenu?.toLowerCase() === items?.label?.toLowerCase() ? "_active" : ""} _dropdownList`}>
                                {items?.dropdown.map((dropdownItems, index) => (
                                    <li key={`dropdownItems${index}`} className={`${dropdownItems?.icon} _inner _label`} onClick={() => actionHandler(dropdownItems?.link, dropdownItems)}>{dropdownItems?.label}</li>
                                ))}
                            </ul>
                        }
                    </li>
                )
            })}
        </ul>
    </section>)
};
export default LeftMenu