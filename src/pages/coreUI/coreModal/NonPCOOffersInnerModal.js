import React, { Component }     from 'react';
import {PRODUCT_TYPE_CSS_MAP}   from 'constants/BureauOffersConstants';
import underscore               from 'utils/paisabazaarUnderscore';
import BannerStatement          from 'widgets/BannerStatement';
import { PL_CASHBACK_OFFER_STATUS }   from '../../../constants/ApiConstants';

class NonePCOOfferModal extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.userName ='';
    }

    buttonClick = () => {
        const { subProductType } = this.props
        const buttonRectificationButton = document.getElementById('rectificationButton')
        const buttonGenericPopup = document.getElementById('genericPopup')
        if (buttonRectificationButton && buttonGenericPopup && subProductType && subProductType == 'CREDITRECTIFICATION') {
            buttonRectificationButton.click()
            buttonGenericPopup.click()
        }
    }

    render() {
        const {name, imageUrl, offer, productName, subProductType, bannerTitle,buttonText,statement, userProfileReducer, tagText, tagIsVisible} = this.props;
        if(userProfileReducer && userProfileReducer.userData){
            this.userName = underscore.result(userProfileReducer.userData, 'firstName');
        }
        return (
                <div className={`${subProductType}__${name}__NonePCOOfferModal`} onClick={() => this.buttonClick()}>
                    
                    <div className="modal_header clear">
                        <div className="heading_parent">
                            <h3 className="main_heading"> Hey, {this.userName}! We have an <span className="fw-7">offer handpicked</span> just for you!</h3>
                        </div>
                        <div className="supporting_image"><img src="/images/offer_illus.svg" alt=""/></div>
                    </div>
                    <div className="modal_body">
                    {
                        tagIsVisible && tagText ? (
                            <div className="p-A name_type clr-f fw-7 fs-12 supporting_txt">
                                {tagText}
                            </div>
                        ) : ''
                    }
                    {
                        PL_CASHBACK_OFFER_STATUS && subProductType && subProductType === 'PL' ?
                            <span className='_offer_img_parent'>
                                <img src="/images/pl_cashback_offer.svg" alt="" className="img_1" />
                            </span> : ''
                    }
                        <div className="offer_partner_parent">
                        <div className={`offer_type`}>{productName}</div> 
                           {imageUrl && <div className="offer_partner"><img src={imageUrl} alt="offer_partner"/></div>}               
                        </div>
                        <div className="main_offer_heading"><h5>{bannerTitle}</h5></div>
                        <div className="clear features">
                        <BannerStatement statement  = {statement} />                          
                        </div>
                        <div className="clear cta_parent">
                            <button className="btn-primary v1" type="submit">{buttonText}</button>
                        </div>
                    </div>   
                </div>
        );
    }
}

export default NonePCOOfferModal;