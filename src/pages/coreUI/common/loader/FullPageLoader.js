import React, {  }     from "react";
import PropTypes       from "prop-types";
import ReactHtmlParser from 'react-html-parser';
import './styles/FullPageLoader.scss';

function FullPageLoader (props) { 
    const {isActive, ...rest } = props;
    return(
        <div className="fullPageLoader backdrop">
            <div className={`${props.wrapperClass} loader`}>
                <p className="loaderMsg">{ReactHtmlParser(props.loaderMsg)}</p>
                <span className={`${props.className ? props.className : "blue"} circleLoader`}></span>
            </div>
        </div>
    );
}

FullPageLoader.propTypes = {
    className               : PropTypes.string,
    wrapperClass            : PropTypes.string,
    buttonText              : PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    isLoading               : PropTypes.bool,
    btnType                 : PropTypes.string,
    btnClickHandler         : PropTypes.func,
    disabled                : PropTypes.bool,
    btnLeftIconSrc          : PropTypes.string, 
    btnLeftIcon             : PropTypes.bool, 
    btnRightIconSrc         : PropTypes.string,
    btnRightIcon            : PropTypes.bool,
};

export default FullPageLoader;

// ----- PROP DESCRIPTION -----
// className - [white-theme || blue-theme]