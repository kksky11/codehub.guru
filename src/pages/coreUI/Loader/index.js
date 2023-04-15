import React, { }     from 'react';
import underscore     from 'utils/paisabazaarUnderscore';
import Image          from 'coreComponents/common/_image';
import './styles/Loader.scss';
function LoaderMain (props){    
    return(    
            <div className={`loaderContainer ${props.className}  ${underscore.result(props, 'overlay', false) ? "overlay " : " "}`}>
                <div className="loaderParent">
                    <div className="imageContainer"><Image height="64px" width="64px" src={`${props.src ? props.src : "/images/icons/PBLoaderAnimation.gif"}`} /></div>
                    <div className="textContainer"><h4 className="infoText">Please wait while we build your Dashboard<div className="dot-elastic"></div></h4></div>
                </div>
            </div>  
        );       
}


//export default ;
export default LoaderMain;