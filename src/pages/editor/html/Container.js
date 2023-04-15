import React, { useEffect, useState } from "react";
import HtmlEditorPage from './index';
function HtmlEditorContainer(props) {
    
    const [homeState, setHomeState] = useState(
        {                  
            isActivatedModalShow: false,
            isLoader: false,
            AccountSessionDetails:[]
        }
     );

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        window.scrollTo(0, 0);
        //getAccountSessionDetails();
    }

    const actionHandler=(type,data)=>{  
        switch(type){    
            case 'closeModal'     : setDataToStore({infoMoreModal:false});  break;
            case 'closeModal'     : setDataToStore({infoMoreModal:false});  break;
            case 'closeModal'     : setDataToStore({infoMoreModal:false});  break;
            default:break;
        } 
    }
    
    const setDataToStore = (currentData) => {
        let storeData = { ...homeState, ...currentData }
        setHomeState(storeData);
    }
    
    return <HtmlEditorPage
            {...props}
            {...homeState}
            actionHandler={actionHandler}
        />
}

export default HtmlEditorContainer