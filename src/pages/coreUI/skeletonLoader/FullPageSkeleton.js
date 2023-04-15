import React, {  }                from 'react';
function FullPageSkeleton (props){
    return (
        <div className="loaderSkeleton fullPageSkeleton">
            <div className="wrapperLayout">
               <div className="headerContainer">
                    <div className='header'>
                        <div className='logo'><div className='c-skeleton__text'></div> </div>
                        <div className='button'><div className='c-skeleton__text'></div></div>
                    </div>
                </div>
                <div className="screen_body mainContainerLayout">
                    <div className="mainSidebarSection">
                        <ul className="_menuList">
                            <li className="c-skeleton__text list"></li>
                            <li className="c-skeleton__text list"></li>
                            <li className="c-skeleton__text list"></li>
                            <li className="c-skeleton__text list"></li>
                            <li className="c-skeleton__text list"></li>
                            <li className="c-skeleton__text list"></li>
                            <li className="c-skeleton__text list"></li>
                        </ul>                                          
                    </div>
                    <div className="mainContentSection">
                        <div className="c-skeleton__text list"></div>
                    </div>
                </div>
            </div>
        </div>
       
    );
}

export default FullPageSkeleton;