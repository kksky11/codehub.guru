import React, {  }     from "react";
import PropTypes       from "prop-types";
import './styles/Tooltip.scss';

function Tooltip (props) { 
    const {wrapperClass="", isActive, ...rest } = props;
    return(
        <div className={`${wrapperClass} tooltipWrapper`}>
            {props.tooltipText && <div className="tooltipText">{props.tooltipText}</div>}
            {props.tooltipBody && <div className={`tooltipContainer`}>{props.tooltipBody}</div>}
        </div>
    );
}

Tooltip.propTypes = {
    wrapperClass            : PropTypes.string,
    tooltipText             : PropTypes.string
};

export default Tooltip;

// ----- PROP DESCRIPTION -----
// className - [white-theme || blue-theme]