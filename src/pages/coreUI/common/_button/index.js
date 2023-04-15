import React, { Component }     from "react";
import PropTypes                from "prop-types";
import './_button.scss';
class Button extends Component {
    render() {
        const {imgWidth="auto",imgHeight="auto", disabled, btnRole, btnType, className, btnClickHandler, buttonText, isLoading, btnLeftIconSrc, btnLeftIcon, btnRightIconSrc, btnRightIcon, ...rest } = this.props;
        let isDisabled = disabled ? disabled : isLoading;
        let buttonClass = className ? className : "blueTheme";
        return(
            <button 
                name            = "_button"
                disabled        = {isDisabled || false}
                type            = {btnType ? btnType : 'button'}
                role            = {btnRole ? btnRole : 'button'}
                className       = {`_button btn ${buttonClass} ${isLoading ? `loader` : ""}`}
                onClick         = {btnClickHandler}
                aria-label      = "Center Align"
                aria-haspopup   = 'true'
                aria-expanded   = 'false'
                {...rest}
            >
                {btnLeftIcon  && <img src={btnLeftIconSrc} width={imgWidth} height={imgHeight} className={`btn_before_image btnIcon`} alt="btn_before_image" />}
                {(buttonText   && !isLoading) && buttonText }
                {isLoading    && <div className={`${"spinner"} ${"m0A"}`}><div className="rect1"></div><div className="rect2"></div><div className="rect3"></div><div className="rect4"></div><div className="rect5"></div></div>}
                {btnRightIcon && btnRightIconSrc && <img src={btnRightIconSrc} width={imgWidth} height={imgHeight} className={"btn_after_image"} alt="btn_after_image" /> }
            </button>
        );
    }
}

Button.propTypes = {
    className               : PropTypes.string,
    buttonText              : PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    isLoading               : PropTypes.bool,
    btnType                 : PropTypes.string,
    btnRole                 : PropTypes.string,
    btnClickHandler         : PropTypes.func,
    disabled                : PropTypes.bool,
    btnLeftIconSrc          : PropTypes.string, 
    btnLeftIcon             : PropTypes.bool, 
    btnRightIconSrc         : PropTypes.string,
    btnRightIcon            : PropTypes.bool,
};

export default Button;

// ----- PROP DESCRIPTION -----
// className - [white-theme || blue-theme]