import React, {  }  from 'react';
//Uses
{/* 
    <ModelHeading 
        {...this.props}  
        stepTitle = {string}
        title     = {string}
        imgIcon   = {string}
        className = {string}
   /> 
*/}

function ModelHeading(props) {
    const {className,stepTitle,title,imgIcon="/images/briefcase.svg"} = props;
    return (
            <div className={`${className} BLOfferModalHeading`}>
                <div className='heading'>
                    <p className="stepTitle">{stepTitle}</p>
                    <p className="title">{title}</p>
                </div>
                <div className='imgContainer'><img src={imgIcon} alt='imgIcon' /></div>
            </div>
           );
  }
    
export default ModelHeading;
