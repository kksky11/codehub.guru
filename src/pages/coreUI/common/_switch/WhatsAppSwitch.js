import React, {  }          from 'react';
import './styles/WhatsAppSwitch.scss';

function WhatsAppSwitch(props) {
    const {actionHandler, value, labelText} = props;

    return (                
            <div className="switch" onClick={()=>actionHandler("IsReceiveWhatsappUpdates")}>
                <div className="content" >
                    <img src="../images/whatsapp_v2.svg" width="24" className="_icon"/>
                    <span>{labelText}</span>  
                    <span className={`${value ? 'active' : ''} lever`}></span>                         
                </div>
            </div>
        );
  }

  
export default WhatsAppSwitch;
