import React from 'react';

import MessageStatus from '../MessageStatus/MessageStatus.jsx';

import './Message.css';

import {formatDate} from '../../../functions.js';

function Message(props) {

    let isLogin = props.isLogin,
        message = props.message;

    return (
        <div className={'message-wrap' + (isLogin === message.senderId ? ' you' : '')}>
            <div className={'message' + (isLogin === message.senderId ? ' you' : '')}>
                <div className="message__text">{ message.text }</div>
                { ((isLogin === message.senderId) && (message.senderId !== message.recipientId)) ? (message.unread ? <MessageStatus isRead={ false } /> : <MessageStatus isRead={ true } />) : null }
                <div className="message__date">{ formatDate(message.date) }</div>
            </div>
        </div>
    );
}

export default Message;