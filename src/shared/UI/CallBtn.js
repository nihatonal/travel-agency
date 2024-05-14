import React, { useState } from 'react';

import call_btn from '../../assets/images/logo.png'
import { IoMdClose } from "react-icons/io";
import './CallBtn.css';
function CallBtn(props) {
    const [MsgBox, setMsgBox] = useState(false);

    return (
        <div className='call-btn-container'>
            <div className={MsgBox ? "call-message box-in" : "call-message box-out"}>
                <button onClick={() => setMsgBox(false)}><IoMdClose /></button>
                <div className="call-message-header">
                    <div className="call-message-manager-info">
                        <img src={call_btn} alt="manager" />
                    </div>
                </div>
            </div>
            <button className="call-btn" onClick={() => setMsgBox(!MsgBox)}>
                <img src={call_btn} alt='call-btn' />
            </button>

        </div>
    );
}

export default CallBtn;