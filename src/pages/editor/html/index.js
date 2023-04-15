import React, { lazy, Suspense } from 'react';
import FullPageSkeleton from "pages/coreUI/skeletonLoader/FullPageSkeleton";
import './styles/HTMLEditor.scss';
import { getCurrentURL}       from "coreApp/utility";
const Button = lazy(() => import('pages/coreUI/common/_button'));
const Image = lazy(() => import('pages/coreUI/common/_image'));

function HtmlEditorScreens(props) {
    const { actionHandler, sessionDetails } = props;    


    return (
        <Suspense fallback={<FullPageSkeleton />}>
            <div className={`${getCurrentURL()}_wrapper`}>
               
            </div>
        </Suspense>
    );
}

export default HtmlEditorScreens;