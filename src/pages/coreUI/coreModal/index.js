import React, { useEffect } from 'react';
import Modal                from 'react-modal';

function CoreModal (props){
    useEffect(() => {
        return function cleanup(){
            let body = document.body;
            if(props.isActive){          
                body.classList.add("filterModalBG");
            }else{
                body.classList.remove("filterModalBG");
            } 
        }     
    },[props.isActive]);

     const {closeIcon=false, componentData,modalWrapperClass, actionHandler, isActive, contentLabel, overlayClassName,onRequestClose, ...rest} = props;
     return (
            <Modal
                isOpen           = {isActive}
                className        = {modalWrapperClass}
                overlayClassName = {`${overlayClassName} ReactModal__Overlay overlay`}               
                onRequestClose   = {onRequestClose ? onRequestClose : ()=>actionHandler("closeModal")}
                contentLabel     = {contentLabel}
                ariaHideApp      = {false}
                {...rest}
            >    
                <div className="modalBodyWrapper">
                    {closeIcon && <span className='close_button' onClick={onRequestClose ? onRequestClose : ()=>actionHandler("closeModal")}>
                        <img src='/images/blue_cross_v2.svg' alt="blue_cross_v2" />
                    </span>}
                    {componentData}
                </div>               
            </Modal>
      );
}

export default (CoreModal);