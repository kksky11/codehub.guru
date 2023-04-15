import React, {  }          from 'react';
import Button               from 'coreComponents/common/_button';
import Heading              from 'coreComponents/heading';
import CoreModal            from 'coreComponents/coreModal';
import './styles/ApplyForOfferModal.scss';

//Usese
{/* 
    <ApplyForOfferModal 
        {...this.props}  
        ClassName    = ''
        data         = {}
        isActive     = {boolean}
        actionHandler= {function}
   /> 
*/}

function ApplyForOfferModal(props) {
    const {data, isActive, actionHandler} = props;
   
    let initialData = {
        "icon"    : "",
        "title"   : "Thank you for Applying!",
        "infoText": [
            "A Paisabazaar representative will contact you in next 24 hours to take IDFC Bank application forward.",
            "You can also check other offers available based on your profile."
        ]
    }

    initialData = data 
    ? {
        "icon"    : data['imageUrl'].partnerImage,
        "title"   : data['header'].text,
        "BTNText" : data['buttons'][0].payload.text,
        "infoText": [`${data['statement'].statementText}`,`${data['statement'].description}`]
     } 
    : initialData;
    

    return (
        <CoreModal
            isActive={isActive}
            actionHandler={actionHandler}
            modalWrapperClass={"common_modal_v2_container v2  common_info_modal _thank_you_modal ApplyForOfferModal"}
            componentData={
             <div className="modalBodyWrapper">
                <div className="slide_bar_parent"><span className="slide_bar"></span></div>
                <span className="close_button" onClick={()=>actionHandler("closeOfferDetailsModal",data)}><img src="/images/blue_cross.svg"/></span>
                <div className="top_image_parent "><img src="/images/discussion_v2.svg"/></div>
                <div className="modal-body">
                    <div className="commonHeading _center"><div className="heading">{initialData.title}</div></div>
                    {initialData.icon && <div className="iconContainer"><img src={initialData.icon} alt=""/></div>}
                    <div className="clear info g-11">
                        { 
                            initialData && initialData.infoText && Object.values(initialData.infoText).map((items, index) => (
                            <p  key={`_info_txt${index}`}  className="_info_txt">{items}</p>
                            ))
                        }
                    </div>
                   {initialData.BTNText && <Button 
                        className="pb-button btn btn-primary" 
                        btnClickHandler={()=>actionHandler("closeOfferDetailsModal",data)}                   
                        role="button" 
                        type="button"
                        aria-haspopup="true" 
                        aria-expanded="false"
                        aria-label="Center Align" 
                        buttonText={initialData.BTNText}
                    />}

                </div>
            </div>
         }
        >
           
        </CoreModal>
    );
  }

export default ApplyForOfferModal;
