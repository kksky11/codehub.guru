import React, { lazy, Suspense } from 'react';
import './styles/home.scss';
const SectionHeading = lazy(() => import('pages/coreUI/sectionHeading'));

function OurProducts(props) {
    const { actionHandler } = props;  
    return (
        <div className={`ourProducts`}>
             <SectionHeading sourceComponent="home " className="center" heading={"Our Products"} subHeading={["Lorem ipsum dolor sit amet, consectetur adipiscing elit."] }/>
            <div className='cardWrapper'>
                <div className='cardContainer'>
                    <h3 className='title'>TEXT Editor</h3>
                    <div className='infoText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                    <h3 className='icon cyberSecurity' onClick={()=>actionHandler("navigate", "/editor/text")}><span className="ti-arrow-right"></span></h3>
                </div>
                
                <div className='cardContainer'>
                    <h3 className='title'>HTML Editor</h3>
                    <div className='infoText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                    <h3 className='icon cyberSecurity' onClick={()=>actionHandler("navigate","/editor/html")}><span className="ti-arrow-right"></span></h3>
                </div>
               
                <div className='cardContainer'>
                    <h3 className='title'>SQL Editor</h3>
                    <div className='infoText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                    <h3 className='icon cyberSecurity' onClick={()=>actionHandler("navigate","/editor/query")} ><span className="ti-arrow-right"></span></h3>
                </div>
               
            </div>
        </div>
    );
}

export default OurProducts;