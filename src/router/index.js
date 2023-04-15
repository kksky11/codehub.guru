import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from 'layout/index';
import { IMAGE_URL } from 'coreApp/constants/imgConstants';
import { sendDataToGTM, setGAAdditionalData } from 'coreApp/analytics';
import { redirectToPage,isEmpty,getIsMobile } from "coreApp/utility";
const TextEditor = lazy(() => import('pages/editor/text/Container'));
const HTMLEditor = lazy(() => import('pages/editor/html/Container'));
const QueryEditor = lazy(() => import('pages/editor/query/Container'));
const HomePage = lazy(() => import('pages/home/Container'));
const isMobile = getIsMobile
const props = { IMAGE_URL,redirectToPage,isEmpty,getIsMobile,isMobile,sendDataToGTM,setGAAdditionalData };
const router = createBrowserRouter([
    {path: "/",element:<Layout {...props}><HomePage {...props} /></Layout>},
    {path: "/home", element:<Layout {...props}><HomePage {...props} /></Layout>},
    {path: "/editor/text", element:<Layout {...props}><TextEditor {...props} /></Layout>},
    {path: "/editor/html", element:<Layout {...props}><HTMLEditor {...props} /></Layout>},
    {path: "/editor/query", element:<Layout {...props}><QueryEditor {...props} /></Layout>},
    {path: "*", element:<Layout {...props}><HomePage {...props} /></Layout>
    },
]);

export default router