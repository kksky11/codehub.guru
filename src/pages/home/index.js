import React, { lazy, Suspense } from 'react';
import FullPageSkeleton from "pages/coreUI/skeletonLoader/FullPageSkeleton";
import './styles/home.scss';
import { getCurrentURL}       from "coreApp/utility";
const Button = lazy(() => import('pages/coreUI/common/_button'));
const Image = lazy(() => import('pages/coreUI/common/_image'));
const OurFeatures = lazy(() => import('pages/home/ourFeatures'));
const OurProducts = lazy(() => import('pages/home/ourProducts'));
const AboutUs = lazy(() => import('pages/home/aboutUs'));


function HomeScreens(props) {
    const { actionHandler, sessionDetails } = props;    


    return (
        <Suspense fallback={<FullPageSkeleton />}>
            <div className={`${getCurrentURL()}_wrapper`}>
                <OurProducts {...props}/>
                <AboutUs {...props}/>
                <OurFeatures {...props}/>
            </div>
        </Suspense>
    );
}

export default HomeScreens;