import React                    from "react";
import PropTypes                from 'prop-types';
import './style/slide.scss';


const SlideCard = (props) => {
    const { children, className, innerDivClassName, slideDirection, isActive = true } = props;
    return(
        isActive && <div className={`sliderCard ${className}`}>
            <div className={`animated ${slideDirection} ${innerDivClassName}`}>  {children} </div>
        </div>
    );
};

SlideCard.propTypes = {
    children            :   PropTypes.node,
    innerDivClassName   :   PropTypes.string,
    slideDirection      :   PropTypes.string,
    className           :   PropTypes.string,
    isActive            :   PropTypes.bool
};

export default SlideCard;