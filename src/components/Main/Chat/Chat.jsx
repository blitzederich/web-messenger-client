import React from 'react';

import ChatHead from './ChatHead.jsx';
import ChatHistory from './ChatHistory.jsx';
import ChatForm from './ChatForm.jsx';

import './Chat.css';

function Chat() {

    return (
        <div className="chat">
            <ChatHead />
            <ChatHistory />
            <ChatForm />         
        </div>
    )
}

export default Chat;