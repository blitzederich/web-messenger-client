import React, {useState, useEffect, useContext} from 'react';

import MessageStatus from '../MessageStatus/MessageStatus.jsx';

import './DialogLink.css';

import {formatDate} from '../../../functions.js';
import Connect from '../../../Connect.js';
import Context from '../../../context.js';

export default function DialogLink(props) {

    let message = props.message;

    const { peerId, setPeerId } = useContext(Context);

    const onLinkClick = e => {
        e.preventDefault();
        setPeerId(message.peerId);
    }

    /**
     * Typing handler
     */
    const [typing, setTyping] = useState(false);
    useEffect(() => {
        let updateId = Connect.addUpdateListener((event) => {

            if (event.type !== 'message:typing') return;
            if (event.data.peerId !== message.peerId) return;
            if (event.data.peerId === peerId) return;

            setTyping(true);
            setTimeout(() => {
                setTyping(false);
            }, 5000);

        });
        return () => {
            Connect.removeUpdateListener(updateId);
        }
    });

    return (
        <a className={'dialog-link' + (message.peerId === peerId ? ' active' : '')} href="" onClick={ onLinkClick }>
            <img className="dialog-link__img" src="img/avatar.png"/>
            <div className="dialog-link__content">
                <div className="dialog-link__head">
                    <b className="dialog-link__peer">{ message.peerFullName }</b>
                    <span className="dialog-link__date">{ formatDate(message.date) }</span>
                </div>
                <div className="dialog-link__text">
                    { message.peerId !== message.senderId || message.senderId === message.recipientId ? <span className="dialog-link__you">Вы: </span> : null }
                    { message.peerId !== message.senderId ? (message.unread ? <MessageStatus isRead={ false } /> : <MessageStatus isRead={ true } />) : (message.unread ? <MessageStatus type={ 'ball' } /> : null) }
                    { typing ? 'набирает сообщение...' : message.text } 
                </div>
            </div>
        </a>
    );
}