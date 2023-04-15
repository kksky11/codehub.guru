import React from 'react';
import './sectionHeading.scss';
function SectionHeading(props) {
  const { className = "", heading, subHeading, sourceComponent = "", tag } = props;
  return (
    <div className={`${className} sectionHeading ${sourceComponent}`}>
      {heading &&
        <div className={"heading"}>
          {heading}
          {tag ? <span className={"tag"}>{tag}</span> : ''}
        </div>
      }
      {subHeading && subHeading.map((items, index) => (<p key={`subTitle_${index}`} className={"subTitle"}>{items}</p>))}
    </div>
  );
}

export default SectionHeading;
