/* eslint-disable new-parens */
import React, {  } from "react";
function Footer(props) {
    return (
        <div className="footerContainer">
            <footer className='footer'>
                <div className="infoText"> © Copyright 2020-{(new Date).getFullYear()} codehub.guru All Rights Reserved.</div>
                <div className="infoText"></div>
            </footer>
        </div>
    )
}

export default Footer