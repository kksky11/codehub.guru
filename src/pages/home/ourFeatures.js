import React, { lazy, Suspense } from 'react';
import './styles/home.scss';
const SectionHeading = lazy(() => import('pages/coreUI/sectionHeading'));

function OurFeatures(props) {
    const { actionHandler } = props;  
    return (
        <div className={`ourFeatures`}>
             <SectionHeading sourceComponent="home " className="center" heading={"Our Features"} subHeading={["Lorem ipsum dolor sit amet, consectetur adipiscing elit."] }/>
            <div className='cardWrapper'>
                <div className='cardContainer'>
                    <h3 className='icon cyberSecurity'><span className="ti-lock"></span></h3>
                    <h3 className='title'>Cyber Security</h3>
                    <div className='infoText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                </div>
               
                <div className='cardContainer'>
                    <h3 className='icon cyberSecurity'><span className="ti-lock"></span></h3>
                    <h3 className='title'>Cyber Security</h3>
                    <div className='infoText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                </div>
               
                <div className='cardContainer'>
                    <h3 className='icon cyberSecurity'><span className="ti-lock"></span></h3>
                    <h3 className='title'>Cyber Security</h3>
                    <div className='infoText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                </div>
               
            </div>
        </div>
    );
}

export default OurFeatures;