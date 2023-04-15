import React, {  }          from 'react';
import Button               from 'coreComponents/common/_button';
import Heading              from 'coreComponents/heading';
import CoreModal            from 'coreComponents/coreModal';
import './styles/CreditProActivated.scss';

//Usese
{/* 
    <CreditProActivated 
        {...this.props}  
        ClassName    = ''
        data         = {}
        isActive     = {boolean}
        actionHandler= {function}
   /> 
*/}

function CreditProActivated(props) {
    const {t,activeBureau, data, isActive, actionHandler} = props; 
    return (
        <CoreModal
            isActive={isActive}
            actionHandler={actionHandler}
            modalWrapperClass={"common_modal_v2_container v2  common_info_modal   _credit_pro_modal"}
            componentData={
             <div className="modalBodyWrapper">
                <div className="slide_bar_parent"><span className="slide_bar"></span></div>
                <span className="close_button"onClick={()=>actionHandler('closeCreditProActivated')} ><img src="/images/blue_cross.svg"/></span>
                <div className="top_image_parent "><img src="/images/credit_pro/insights.svg"/></div>
                <div className="modal-body">
                    <div className="commonHeading _center"><div className="heading">{t('creditProLanding:creditProActivated.title')}</div></div>
                    <div className="clear info g-11"><p className="_info_txt">{t('creditProLanding:creditProActivated.infoText')}</p></div>
                    <div className="cta_parent">
                        <Button 
                            className      = "pb-button btn btn-primary v1" 
                            btnClickHandler= {()=>actionHandler('ExploreDashboard')}                   
                            role           = "button" 
                            type           = "button"
                            aria-haspopup  = "true" 
                            aria-expanded  = "false"
                            aria-label     = "Center Align" 
                            buttonText     = {t('creditProLanding:creditProActivated.cta')}
                        />
                    </div>
                </div>                
            </div>
         }
        >
           
        </CoreModal>
    );
  }

export default CreditProActivated;
