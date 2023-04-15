import React from 'react';
import {isMobile }              from "react-device-detect";
import CoreModal from 'coreComponents/coreModal';
import './styles/CreditExpertSessionPopup.scss';


function CreditExpertSessionPopup(props) {
    const { isCreditExpertSessionPopup, closeCreditExpertSessionPopup } = props;

    return (
        <CoreModal
            isActive={isCreditExpertSessionPopup}
            actionHandler={closeCreditExpertSessionPopup}
            modalWrapperClass={"common_modal_v2_container v2 common_info_modal _credit-expert-modal"}
            componentData={
                <div className="modalBodyWrapper">
                    <span className="close_button" onClick={() => closeCreditExpertSessionPopup()}>
                        { isMobile ? <img src="/images/black_cross_with_bg.svg" /> : <img src="/images/blue_cross_v2.svg" /> }
                    </span>

                    <div className="modal-body">
                        <div className="commonHeading _left">
                            <span className="heading">Credit Expert Session</span>
                            <span className="_tag">Add-on</span>
                        </div>
                        <p className="fs-12 fw-6 clr-blue1">Service Call with our Credit Expert covers</p>
                        <ul className="_session-points">
                            <li><img src="/images/round_pink_tick.svg" /> <p>How credit score impacts you</p></li>
                            <li><img src="/images/round_pink_tick.svg" /> <p>Actionable insights to maintain a healthy score</p></li>
                            <li><img src="/images/round_pink_tick.svg" /> <p>Assistance in applying for loans</p></li>
                            <li><img src="/images/round_pink_tick.svg" /> <p>Step-by-Step guidance in error correction</p></li>
                        </ul>
                        <p className="_satisfied-cust">
                            <hr class="custom_hr"></hr>
                            <span>🤩 1 Lac + Satisfied customers</span>
                            <hr class="custom_hr"></hr>
                        </p>
                        
                        <span className="_got-it" onClick={() => closeCreditExpertSessionPopup()}>
                            Okay, Got it
                        </span>
                    </div>
                </div>
            }>
        </CoreModal>
    );
}

export default CreditExpertSessionPopup;
