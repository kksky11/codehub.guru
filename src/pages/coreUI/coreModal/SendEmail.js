import React, {  }          from 'react';
import Button               from 'coreComponents/common/_button';
import Heading              from 'coreComponents/heading';
import CoreModal            from 'coreComponents/coreModal';
import './styles/SendEmail.scss';

//Usese
{/* 
    <SendEmail
        isActive     = {isEmailModal}    
        actionHandler= {actionHandler}
        activeBureau = {activeBureau}
        reportNumber = {reportNumber}
        showError    = {showError}
        selectedError = {selectedError}
        data         = {{
            "title": "Did you notice an error in your account?" ,
            "infoText": activeBureau == "CIBIL" 
                        ? `Raise a dispute with Cibil today quoting your Control Number(ECN) which is located in personal details section of the Credit Health Report ` 
                        : `If you have found any mistake(s) in your credit report details, we suggest you to send an email to ${activeBureau}.`,
            "cta":`${activeBureau == "CIBIL" ? "Report to CIBIL": "Send Email"}`,
            "errorText":"Please select error type !",
            "errorList":[
                "This is not my account",
                "The account status is incorrect",
                "Account is reflecting multiple times",
                "Other Data is Incorrect"
                ]
        }} 
   /> 
*/}

function SendEmail(props) {
    const {selectedError, showError, reportNumber, activeBureau, data, isActive, actionHandler} = props;
    // const errorHandler =(type, params)=>{ 
    //     actionHandler("sentEmailOptionsSelected",params);
    // }
    
    let initialData = {
        "title": "Did you notice an error in your account?" ,
        "infoText": activeBureau == "CIBIL" 
                    ? `Raise a dispute with Cibil today quoting your Control Number(ECN) which is located in personal details section of the Credit Health Report ` 
                    : `If you have found any mistake(s) in your credit report details, we suggest you to send an email to ${activeBureau}.`,
        "cta":`${activeBureau == "CIBIL" ? "Report to CIBIL": "Send Email"}`,
        "errorText":"Please select error type !",
        "errorList":[
            "This is not my account",
            "The account status is incorrect",
            "Account is reflecting multiple times",
            "Other Data is Incorrect"
          ]
    }

    initialData = data ? data : initialData;

    return (
        <CoreModal
            isActive={isActive}
            actionHandler={actionHandler}
            modalWrapperClass={"common_modal_v2_container  br_4 common_info_modal _error_modal _v2 br_8 bg-f p-R bg-f"}
            componentData={
             <div className="modalBodyWrapper">
                <div className="slide_bar_parent"><span className="slide_bar"></span></div>
                <span className="close_button" onClick={()=>actionHandler("closeModal")}><img src="/images/blue_cross_v2.svg"/></span>
                <div className="modal-body">
                    <div className="info_heading clear">
                        <div className="commonHeading g-8-s "><div className="heading">{initialData.title}</div></div>
                        <div className="main_img_parent g-4-s vMid _R"><img src="/images/girl_on_chair_v2.svg" alt="report" className="_vitems"/></div>
                    </div>
                    <div className="info _v2"><p className="_info_txt">{initialData.infoText}</p></div>
                    {showError && <p className="errorText">{initialData.errorText}</p>}
                    {activeBureau != "CIBIL" && <div className="_list">
                        <ul className={`${showError? "error" :""} _common_chkbox_list`}>
                            { 
                                initialData && initialData.errorList && Object.values(initialData.errorList).map((items, index) => (
                                    <li  key={`_checkbox${++index}`}>
                                        <input type="radio" onChange={()=>actionHandler('sentEmailOptionsSelected',items)} className="checkbox" value="on" name={`errorReport`} id={`list_${index}`}/>
                                        <label htmlFor={`list_${index}`}>{items}</label>   
                                    </li>
                                ))
                            }
                        </ul>
                    </div>}
                    
                    <div className="cta_parent">                    
                        <Button 
                            className      = "pb-button btn btn-primary v1" 
                            btnClickHandler= {()=>actionHandler('sentEmail', selectedError)}                   
                            role           = "button" 
                            type           = "button"
                            aria-haspopup  = "true" 
                            aria-expanded  = "false"
                            aria-label     = "Center Align" 
                            buttonText     = {initialData.cta}
                        />
                    </div>
                </div>
            </div>
         }
        >
           
        </CoreModal>
    );
  }

export default SendEmail;
