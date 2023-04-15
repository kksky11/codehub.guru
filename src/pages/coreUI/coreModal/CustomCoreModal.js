import React,{useState,useEffect, Fragment} from "react";
import PropTypes                        from 'prop-types';
import SlideCard                        from "coreComponents/common/_Slide";
import Drawer                           from 'coreComponents/common/_drawer';
import { CloseIcon }                    from 'utils/Images';
import './styles/CoreModal.scss';

function CustomCoreModal (props) {
    const {
        isOpenModal, disableBodyScroll, callBackAction,slideDirection,modalHeading,
        modalHeadingLogo, modalBody, customClassName, customIdName, drawer= false
    } = props;

    const [isDesktop, setIsDesktop]                = useState(window.innerWidth > 767 ? true: false)
    const [isOpenModalState, setIsOpenModalState]  = useState(isOpenModal ? isOpenModal : false)
    const [isDrawer, setIsDrawer]                  = useState(window.innerWidth > 767 ? drawer: true)
    
    useEffect(() => {
        setIsOpenModalState(isOpenModal);
        if(isOpenModal && disableBodyScroll){ 
            document.querySelector('body').classList.add('CoreModalShow');         
        }else{
            document.querySelector('body').classList.remove('CoreModalShow'); 
        }
    },[isOpenModal]);     

    const handleClose=(isOpenModal)=>{
        setIsOpenModalState(!isOpenModalState);
        callBackAction(!isOpenModal);
        document.querySelector('body').classList.remove('CoreModalShow');
    }

    return(
        <Fragment>
                {(!isDrawer && isDesktop && isOpenModal) && <div className={isOpenModal ? `coreModalContainer ${customClassName}` : "hide"} role="presentation" >
                    <SlideCard slideDirection={slideDirection ? slideDirection : "down"} className="modalWrapper" >
                        <Fragment>
                            <div className={`${modalHeading ? 'modalHeadBG' : 'noHeader'} modalHead`} onClick={() =>handleClose(isOpenModal)} role="presentation">
                                <div className="title">
                                <span className="lineBar"/>
                                        {modalHeadingLogo && <img className="modalHeadingLogo" src={modalHeadingLogo} alt=""/> }
                                        {modalHeading && <h2>{modalHeading}</h2>}
                                </div> 
                                <img className="closeIcon"  src={CloseIcon} alt=""/>
                            </div>
                            <div className={`${modalHeading ? "" : "noHeader"} modalBody`}>{modalBody ? modalBody : "No children Component Found"}</div>
                        </Fragment>
                    </SlideCard>
                </div>}
                <Drawer customClass={`coreModalContainer ${customClassName}`} anchorDirection={!isDesktop ? "bottom" : slideDirection} isOpen={(isDrawer || !isDesktop) && isOpenModal} onCloseHandler={() =>handleClose(isOpenModal)}
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
                            <img className="closeIcon"  src={CloseIcon} alt=""/>
                        </div>
                        <div className={`${modalHeading ? "" : "noHeader"} modalBody`}>{modalBody ? modalBody : "No children Component Found"}</div>
                    </div>
                </Drawer>
        </Fragment>
    );
}

CustomCoreModal.propTypes = {
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

export default CustomCoreModal;