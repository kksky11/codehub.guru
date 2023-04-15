import React, { useEffect, useState } from "react";
import TextEditorPage from './index';
function TextEditorContainer(props) {
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
    }

    const actionHandler=(type,data)=>{  
        switch(type){    
            case 'closeModal'     : setDataToStore({infoMoreModal:false});  break;
            default:break;
        } 
    }

    const setDataToStore = (currentData) => {
        let storeData = { ...homeState, ...currentData }
        setHomeState(storeData);
    }
    
    return <TextEditorPage
            {...props}
            {...homeState}
            actionHandler={actionHandler}
        />
}

export default TextEditorContainer