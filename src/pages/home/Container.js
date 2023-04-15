import React, { useEffect, useState } from "react";
import HomePage from './index';
import { useNavigate }   from "react-router-dom";
function HomeContainer(props) {
    const navigate = useNavigate();
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
            case 'navigate'       : navigate(data); break;
            default:break;
        } 
    }

  

//    const getAccountSessionDetails= async()=>{
//         let payload = {}
//         try {
//             const response = await request(LOGOUT_SESSION,'POST',{}, payload );
//             if (!response.ok) throw new Error(`Error: ${response.status}`);
//             const data = await response.json();
//             if(data.statusCode === "invalidAccessToken"){logout(visitId,props);}
//             if(isEmpty(data)){
//                 setDataToStore({AccountSessionDetails:data.response});
//             }
           
//           } catch (e) {
//             alert(e);
//           }
        
//     }


  
    const setDataToStore = (currentData) => {
        let storeData = { ...homeState, ...currentData }
        setHomeState(storeData);
    }
    
    return <HomePage
            {...props}
            {...homeState}
            actionHandler={actionHandler}
        />
}

export default HomeContainer