/* eslint-disable react-hooks/exhaustive-deps */
import React, {lazy, useEffect, useState, Fragment } from 'react';
import PropTypes from "prop-types";
import './styles/Toast.scss';
const SlideCard = lazy(() => import('pages/coreUI/common/_Slide'));
// import * as Images from "utils/Images";
// import { CloseIcon} from 'utils/Images';

function ToastDialog(props) {
  const { status, message, isActiveToast } = props;
  const [messageState, setMessageState] = useState(message);
  const [isActiveToastState, setIsActiveToastState] = useState(isActiveToast);

  useEffect(() => {
    init();
  }, [props?.isActiveToast, props?.message]);

  const init = () => {
    setMessageState(message);
    setIsActiveToastState(isActiveToast);
    setTimeout(() => {
      setMessageState("");
      setIsActiveToastState(false);
      props?.actionHandler("emptyToast","");
    }, 3000);
  }
  return (
    <Fragment>
      {isActiveToastState && <SlideCard slideDirection="fadeIn" className={isActiveToastState ? "tostContainer" : "hide"}>
        <div className={status === true ? 'msgPopup success' : 'msgPopup'}>
          <div className="ti-close closeIcon" onClick={() =>setIsActiveToastState(!isActiveToastState)}></div>
          <img src={`${props?.IMAGE_URL}${status === true ? 'tick/tickSelected' : 'errors/error_with_circle'}.svg` } alt="" />
          {messageState}
        </div>
      </SlideCard>}
    </Fragment>
  );
}

ToastDialog.propTypes = {
  message: PropTypes.string,
  isActiveToast: PropTypes.bool,
  status: PropTypes.bool
};
export default ToastDialog;