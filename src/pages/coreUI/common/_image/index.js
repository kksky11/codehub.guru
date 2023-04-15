import React, { Fragment }      from "react";
import PropTypes                from "prop-types";
import LazyLoad                 from 'react-lazy-load';
import './Image.scss';  
import { IMAGE_URL,IMAGE_STATIC_URL } from 'coreApp/constants/imgConstants';
function Image (props) {
    const {type, height="auto", width="auto", lazy=true, offset=10, className,src, alt,...rest } = props;
    const onerror=(e)=>{
        if(e.type === "error"){
            let errorImg = `${IMAGE_STATIC_URL || IMAGE_URL}icons/NoImageFound.jpg`;
            //if(type === "bank"){errorImg = `${IMAGE_STATIC_URL || IMAGE_URL}bankLogos/icons/bank_icon.svg`;}
            
            e.target.src = errorImg; e.target.alt=`${type ? type : 'errorImg'}`;
            e.target.className = `errorImg ${type} ${className ? className : ""} img`;
            if(height==="auto" && width==="auto"){ e.target.height="40px"; e.target.width="100px";}
        }
    };
    
    return(
            <Fragment>
                {lazy 
                    ? <LazyLoad offset={offset}>
                        <img height={height} width={width} src={src} className={`${className ? className : ""} img`} alt={alt ? alt : "_img"}  onError={(e)=>onerror(e)} {...rest}/> 
                    </LazyLoad>
                    : <img height={height} width={width} src={src} className={`${className ? className : ""} img`} alt={alt ? alt : "_img"}  onError={(e)=>onerror(e)} {...rest}/> 
                }
           </Fragment>
    );
}

Image.propTypes = {
    className               : PropTypes.string,
    src                     : PropTypes.string,
    alt                     : PropTypes.string
};

export default Image;
