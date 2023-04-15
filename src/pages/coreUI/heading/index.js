import React from 'react';
import './styles/heading.scss';
function Heading(props) {
  const { className, headingClass, heading, subHeading, sourceComponent, onlyCreditHealthPaid } = props;
  return (
    <div className={`${className} ${headingClass} ${sourceComponent} commonHeading`}>
      {heading &&
        <div className={`heading`}>
          {heading}
          {onlyCreditHealthPaid ? <span className={"tag"}>Add-on</span> : ''}
        </div>
      }
      {subHeading && subHeading.map((items, index) => (<p key={`subHeading_${index}`} className={"subHeading"}>{items}</p>))}
    </div>
  );
}

export default Heading;
