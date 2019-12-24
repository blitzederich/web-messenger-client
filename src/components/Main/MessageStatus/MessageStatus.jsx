import React from 'react'

import './MessageStatus.css';

export default function MessageStatus(props) {
    let type = props.type, 
        isRead = props.isRead;

    const BallUnRead = (
        <div className="message-status-ball"></div>
    );

    const CheckRead = (
        <div className="message-status"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0V0z"/>
                <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"/>
            </svg>
        </div>
    );

    const CheckUnRead = (
        <div className="message-status">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0V0z"/>
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
            </svg>
        </div>
    );

    switch (type) {
        case 'ball': {
            return BallUnRead;
        }    
        default:{
            if (isRead) return CheckRead;
            return CheckUnRead;
        }
    }
}