import React, {useState, useEffect, useContext} from 'react';

import ViewProfile from '../ViewProfile/ViewProfile.jsx';

import {timeDiff} from '../../../functions.js';
import Context from '../../../context.js';
import API from '../../../api.js';

import './ChatHead.css';

export default function ChatHead(props) {

    const { peerId, setPeerId } = useContext(Context);

    const [peerFullName, setPeerFullName] = useState('');
    const [peerActivity, setPeerActivity] = useState({text: 'Был(а) в сети давно'});

    useEffect(() => {
        (async () => {
            if (!peerId) return;

            let api_getUsers = await API('/Users/getUsers', { usersId: [peerId] }),
                peer = api_getUsers.data.users[ 0 ];
            
            setPeerFullName(peer.fullName);

            let api_getActivity = await API('/Users/getActivity', { usersId: [peerId] });

            if (api_getActivity.data.activity.length === 0)
                return setPeerActivity({text: 'Был(а) в сети давно'});

            let date = api_getActivity.data.activity[ 0 ].date;
                
            let activity = timeDiff(date);

            setPeerActivity( activity );

        })();
    }, [peerId]);

    const onButtonClick = e => setPeerId(false);

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
                    <span className={'profile-link__status' + (peerActivity.isOnline ? ' online' : '')}>{ peerActivity.text }</span>
                </div>

            </div>
            { modalView ? <ViewProfile userId={ peerId } close={ closeProfile } /> : null }
        </>
    )
}