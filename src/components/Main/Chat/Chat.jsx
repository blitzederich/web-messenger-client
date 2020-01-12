import React, {useContext} from 'react';

import ChatHead from './ChatHead.jsx';
import ChatHistory from './ChatHistory.jsx';
import ChatForm from './ChatForm.jsx';

import './Chat.css';

import Context from '../../../context.js';

function Chat(props) {

    const { setPeerId } = useContext(Context);

    return (
        <div className="chat">
            <ChatHead />
            <ChatHistory />
            <ChatForm />         
        </div>
    )
}

export default Chat;