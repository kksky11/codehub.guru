import React, { Component } from 'react';
import Modal                from 'react-modal';

class CoreEmailModal extends Component {
    constructor(props) {
        super(props);
        this.props = props;       
    } 

    render() {
        const {data, actionHandler, isEmailModal} = this.props; 
     return (
            <Modal
                isOpen    = {isEmailModal}
                className = {{
                    base     : 'common_modal_v2_container common_info_modal _error_modal',
                    afterOpen: ''
                }}
                overlayClassName = {{
                    base        : 'ReactModal__Overlay',
                    afterOpen   : 'overlay',
                    beforeClose : 'overlay'
                }}
                onRequestClose = {()=>actionHandler("closeModal")}
                contentLabel   = ""
                ariaHideApp = {false}
            >    
                <div className="slide_bar_parent">
                    <span className="slide_bar"></span>
                </div>
                    <span className="close_button" onClick={()=>actionHandler("closeModal")}>
                    <img src="/images/blue_cross.svg"alt='blueCross' />
                    </span>
                    <div className="top_image_parent fullCon light_pink_v3 bg-light_pink_v3 _C">
                        <img src="/images/error_image.svg" alt='blueCross'/>
                    </div>
                    <div className="modal-body">
                        <div className="clear content _C m0A g-12-s">
                            <h5 className="fs-18 fw-7 clr-blue5 mT10 mB10">{data.title}</h5>
                            <p className="clr-blue1 mT0 mB24 fs-12">{data.infoText}</p>
                            <button className="pd15 mB15 bg-blue5 g-10 fs-14 fs-6 clr-f bdr0 br_8 hand " type="submit"  onClick={()=>actionHandler("sentEmail")}>{data.cta}</button>
                            {data.cancel && <button onClick={()=>actionHandler("closeModal")} className="m0A bdr0 hand bg-f clr-blue5 mT20 dB fs-14 fw-6 no_txt_dec" type="button">Cancel</button>}
                        </div>
                </div>                
            </Modal>
      );
   }
}

export default (CoreEmailModal);