import React, {  }          from 'react';
import './styles/ConsentSwitch.scss';
function ConsentSwitch(props) {
    const {actionHandler} = props;
    const { isLoader, value, labelText, iconSrc, name="consentSwitch", className=""} = props.consentSwitchData;
    return (                
            <div className={`${className} ${isLoader ? "disabled" : ""} switch`} onClick={()=>actionHandler(name,!value)}>
                <div className="content" >
                    {iconSrc   && <img src={`${iconSrc}`} width="24" className="_icon"/>}
                    {labelText && <span>{labelText}</span> } 
                    <span className={`${value ? 'active' : ''} lever`}></span>                         
                </div>
            </div>
        );
  }
  
export default ConsentSwitch;