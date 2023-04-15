import React from 'react';
import Lottie               from 'react-lottie';
import animationData        from 'coreApp/constants/_lotties/OffersAnimations.json';
export default function Lotties(props) { 
    const {optionsData, handleEventAction=true} = props;
    let isCompleted = "";
    const defaultOptions = {
        loop            : optionsData && optionsData.loop ? optionsData.loop : false,
        autoplay        : optionsData && optionsData.autoplay ? optionsData.autoplay : true,
        animationData   : optionsData && optionsData.animationData ? optionsData.animationData : animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

      const handleEvent = (obj) => {
          if(!handleEventAction){return}
          if (obj.currentTime === (obj.totalTime - 1)) {
            document.getElementById('LottieWrapper').classList.add('hide');
            isCompleted = 'deactive'
          }
      }

    return (
        <div className={`${isCompleted} LottieWrapper`} id="LottieWrapper">
            <Lottie 
                options = {defaultOptions}
                height  = {optionsData && optionsData.height? optionsData.height :window.innerHeight}
                width   = {optionsData && optionsData.width?optionsData.width : window.innerWidth}
                eventListeners={
                  [
                    {
                      eventName: 'enterFrame',
                      callback: obj => handleEvent(obj),
                    },
                  ]
                }
            />
        </div>
    );
  }

