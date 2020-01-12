import React, {useState, useEffect, useContext} from 'react';

import ViewProfile from '../ViewProfile/ViewProfile.jsx';

import {timeDiff} from '../../../functions.js';
import Connect from '../../../Connect.js';
import Context from '../../../context.js';

import Users from '../../../store/Users.js';

import './ChatHead.css';

export default function ChatHead() {

    const { peerId, setPeerId } = useContext(Context);

    /**
     * Typing handler
     */
    const [typing, setTyping] = useState(false);
    useEffect(() => {
        let updateId = Connect.addUpdateListener((event) => {

            if (event.type !== 'message:typing') return;
            if (event.data.peerId !== peerId) return;

            setTyping(true);
            setTimeout(() => {
                setTyping(false);
            }, 5000);

        });
        return () => {
            Connect.removeUpdateListener(updateId);
        }
    });

    const [peerFullName, setPeerFullName] = useState('');

    const activityObj = {
        isOnline: false, 
        isWriting: false, 
        text: 'Был(а) в сети давно'
    };
    const [peerActivity, setPeerActivity] = useState(activityObj);

    useEffect(() => {
        (async () => {
            if (!peerId) return;

            let getUsers = await Users.getUsers([peerId]),
                peer     = getUsers[ peerId ];

            setPeerFullName(peer.fullName);

            let lastActivity = timeDiff(peer.lastActivity);

            setPeerActivity( lastActivity );

        })();
    }, [peerId]);

    useEffect(() => {

        const updateActivity = (user) => {
            if (user.id !== peerId) return;

            let lastActivity = timeDiff(user.lastActivity);

            setPeerActivity( lastActivity );

        }

        Users.on('users:activity', updateActivity);
        return () => {
            Users.removeListener('users:activity', updateActivity);
        }
    }, [peerId]);

    const onButtonClick = () => setPeerId(false);

    const [modalView, setModalView] = useState(false);

    const showProfile = () => setModalView(true);
    const closeProfile = () => setModalView(false);

    return (
        <>
            <div className="chat__head">

                <div className="chat__back-wrap" onClick={ onButtonClick }>
                    <div className="chat__back"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" d="M0 0h24v24H0V0z"/>
                            <path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z"/>
                        </svg>
                    </div>
                </div>

                <div className="profile-link" onClick={ showProfile }>
                    <b className="profile-link__fullname">{ peerFullName }</b>
                    <span className={'profile-link__status' + (peerActivity.isOnline ? ' online' : '')}>{ typing ? 'набирает сообщение...' : peerActivity.text }</span>
                </div>

            </div>
            { modalView ? <ViewProfile userId={ peerId } close={ closeProfile } /> : null }
        </>
    )
}