import React,{useState,useEffect, Fragment} from "react";
import PropTypes                        from 'prop-types';
import SlideCard                        from "pages/coreUI/common/_Slide";
import Drawer                           from 'pages/coreUI/common/_drawer';
import './styles/CoreModal.scss';

function CoreModal(props) {
    const {
        isOpenModal, disableBodyScroll, callBackAction,slideDirection,modalHeading,
        modalHeadingLogo, modalBody, customClassName, customIdName,
        wrapperClass
    } = props;

    const [isDesktop, setIsDesktop]                = useState(window.innerWidth > 767 ? true: false)
    const [isOpenModalState, setIsOpenModalState]  = useState(isOpenModal ? isOpenModal : false)
    
    useEffect(() => {
        setIsOpenModalState(isOpenModal);
        if(isOpenModal && disableBodyScroll){ 
            document.querySelector('body').classList.add('CoreModalShow');  
            document.addEventListener('click', clickOutside, false)       
        }else{
            document.querySelector('body').classList.remove('CoreModalShow'); 
            document.removeEventListener('click', clickOutside, false)
        }
        setIsDesktop(window.innerWidth > 767 ? true: false)
    },[disableBodyScroll, isOpenModal]);     

    const handleClose=(isOpenModal)=>{
        setIsOpenModalState(!isOpenModalState);
        callBackAction(!isOpenModal);
        document.querySelector('body').classList.remove('CoreModalShow');
    }
    const clickOutside = (e) => { 
        // if (e.target.offsetParent && e.target.offsetParent.classList &&  e.target.offsetParent.classList['0'] != 'wrapperClass') {
        //     handleClose(isOpenModal);
        // }
    }
    

    return(
        <Fragment>
            {(isDesktop && isOpenModal) && <div className={isOpenModal ? `coreModalContainer ${customClassName}` : "hide"} role="presentation" >
                <SlideCard wrapperClass={wrapperClass ? wrapperClass : "wrapperClass"}  slideDirection={slideDirection ? slideDirection : "down"} className="modalWrapper" >                       
                        <div className={`${modalHeading ? 'modalHeadBG' : 'noHeader'} modalHead`} onClick={() =>handleClose(isOpenModal)} role="presentation">
                            {(modalHeading || modalHeadingLogo) &&
                            <div className="title">
                                    <span className="lineBar"/>
                                    {modalHeadingLogo && <img className="modalHeadingLogo" src={modalHeadingLogo} alt=""/> }
                                    {modalHeading && <h2>{modalHeading}</h2>}
                            </div>}  
                            <div className="ti-close closeIcon" onClick={() =>handleClose(isOpenModal)}></div>
                        </div>
                        <div className={`${modalHeading ? "" : "noHeader"} modalBody`}>{modalBody ? modalBody : "No children Component Found"}</div>                       
                </SlideCard>
            </div>}
            <Drawer customClass={`coreModalContainer ${customClassName}`} anchorDirection="bottom" isOpen={!isDesktop && isOpenModal} onCloseHandler={() =>handleClose(isOpenModal)}
                disableSwipeToOpen={true}
                disableDiscovery={true}
            >
                <div className="modalWrapper" id={`${customIdName}`} >
                    <div className={`${modalHeading ? 'modalHeadBG' : 'noHeader'} modalHead`} onClick={() =>handleClose(isOpenModal)} role="presentation">
                        <div className="title">
                            <span className="lineBar"/>
                            {modalHeadingLogo && <img className="modalHeadingLogo" src={modalHeadingLogo} alt=""/> }
                            {modalHeading && <h2>{modalHeading}</h2>}
                        </div> 
                        <span className="ti-close closeIcon" onClick={() =>handleClose(isOpenModal)}></span>
                    </div>
                    <div className={`${modalHeading ? "" : "noHeader"} modalBody`}>{modalBody ? modalBody : "No children Component Found"}</div>
                </div>
            </Drawer>
        </Fragment>
    );
}

CoreModal.propTypes = {
    isOpenModal             : PropTypes.bool,
    callBackAction          : PropTypes.func,
    isModalHeadingBG        : PropTypes.bool,
    modalHeading            : PropTypes.string,
    modalHeadingLogo        : PropTypes.string, 
    modalBody               : PropTypes.object, 
    customClassName         : PropTypes.string,
    customIdName            : PropTypes.string,
    slideDirection          : PropTypes.string,
    disableBodyScroll       : PropTypes.bool
};

export default CoreModal;