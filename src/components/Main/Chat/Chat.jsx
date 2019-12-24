import React, { useEffect, useContext} from 'react';

import ChatHead from './ChatHead.jsx';
import ChatHistory from './ChatHistory.jsx';
import ChatForm from './ChatForm.jsx';

import './Chat.css';

import Context from '../../../context.js';

function Chat(props) {


    const { setPeerId } = useContext(Context);

    /*** Touch ***/

    let clientX,
        clientY;

    const onTouchStart = e => {
        clientX = e.touches[ 0 ].clientX;
        clientY = e.touches[ 0 ].clientY;
    }

    const onTouchMove = e => {

        let difX = e.touches[ 0 ].clientX - clientX,
            difY = e.touches[ 0 ].clientY - clientY;

        if (difX < 0) return;
        if (difX < 80) return;
        if (difX < difY) return;

        setPeerId(false);
        
    }

    const onTouchEnd = e => {
        clientX, clientY = undefined;
    }

    /*** Touch end ***/

    return (
        <div
            className="chat"

            onTouchStart={ onTouchStart }
            onTouchMove={ onTouchMove } 
            onTouchEnd={ onTouchEnd }
        >
            <ChatHead />
            <ChatHistory />
            <ChatForm />         
        </div>
    )
}

export default Chat;