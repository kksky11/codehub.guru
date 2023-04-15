/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect,useState,lazy}  from 'react';
import './styles/DownloadAppDropdown.scss';
import {BASE_URL} from 'coreApp/constants/apiConstants';
const Button = lazy(() => import('pages/coreUI/common/_button'));
const Images = lazy(() => import('pages/coreUI/common/_image'));


function DownloadAppDropdown (props){  
        const [downloadAppDropdownState, setDownloadAppDropdownState] = useState(
            {  
                toggleDropdownId  : "",
                defaultOpenMenu   : false,
                isDownloadAppModalActive     : false,
            }
         );
         useEffect(() => {
            document.addEventListener('click', clickOutside, false);            
        },[]);

        const clickHandler=(actionType,data)=>{
            switch(actionType){
                case "app-store"   :props?.redirectToPage(BASE_URL?.APP_STORE, '_blank'); break;
                case "google-play" :props?.redirectToPage(BASE_URL?.GOOGLE_PLAY, '_blank'); break;
                default            :break;
            }
          
        }
      
        const clickOutside = (e) => { 
            if(e && e.target && e.target.offsetParent && e.target.offsetParent.classList && (e.target.offsetParent.classList[0]=== 'downloadAppContainer' || e.target.offsetParent.classList[0]=== 'downloadAppModal')){
                return
            }else{
                setDownloadAppDropdownState({...downloadAppDropdownState,isDownloadAppModalActive : false });
            }      
        }     

        return (
            <section className="downloadAppContainer">
                 <Button
                    className={`${downloadAppDropdownState.isDownloadAppModalActive ? "active" :""} btn downloadApp`}
                    btnClickHandler={() => setDownloadAppDropdownState({...downloadAppDropdownState,isDownloadAppModalActive : !downloadAppDropdownState.isDownloadAppModalActive })}
                    buttonText={'Download App'}
                    btnLeftIcon
                    btnLeftIconSrc={downloadAppDropdownState.isDownloadAppModalActive ? `${props?.IMAGE_URL}leftMenu/installApp.svg` : `${props?.IMAGE_URL}header/appInstall.svg`}
                    imgWidth="18px"
                    imgHeight="13px"
                />
                {downloadAppDropdownState.isDownloadAppModalActive &&
                    <div className='downloadAppModal'>
                        <h3 className='title'>Download the Paisabazaar Mobile App</h3>
                        <p className='infoText'>Scan or click to Download App on your mobile</p>                       
                        <div className='scanner'>
                            <div className='scannerCode'>
                                <Images height="82px" width="82px" src={`${props?.IMAGE_URL}header/PB-scan.png`} alt='PB-scan' />                                
                            </div>
                            <div className='orSeparator'></div>
                            <div className='appIcon'>
                                <Images height="26px" width="95px" src={`${props?.IMAGE_URL}header/google-play.svg`} alt='google-play' className='google-play' onClick={()=>clickHandler('google-play')} />
                                <Images height="26px" width="95px" src={`${props?.IMAGE_URL}header/app-store.svg`} alt='app-store'  className='app-store' onClick={()=>clickHandler('app-store')} />
                            </div>
                        </div>
                    </div>
                }                
            </section>                       
          );
}



export default DownloadAppDropdown;
