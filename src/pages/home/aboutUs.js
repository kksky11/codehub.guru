import React, { lazy, Suspense } from 'react';
import './styles/home.scss';
const SectionHeading = lazy(() => import('pages/coreUI/sectionHeading'));

function AboutUs(props) {
    const { actionHandler } = props;  
    return (
        <div className={`aboutUs`}>
            <div className='infoContainer'>
                <div className='infoTitle'>
                    <SectionHeading sourceComponent="myAccount myProfile" heading={"About Us"} subHeading={["Lorem ipsum dolor sit amet, consectetur adipiscing elit."] }/>
                </div>
                <div className='infoText'>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu laoreet odio. Aenean eget lorem pellentesque, imperdiet ex convallis, iaculis justo. Etiam ac purus purus. Vivamus vel lacus non diam gravida efficitur. Proin elementum velit vel mauris euismod consectetur. Nunc neque libero, pulvinar et odio eu, vestibulum iaculis tortor.
                </div>
            </div>
        </div>
    );
}

export default AboutUs;