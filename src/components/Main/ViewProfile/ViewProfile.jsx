import React, {useState, useEffect, useContext} from 'react';

import Modal from '../Modal/Modal.jsx';

import {timeDiff} from '../../../functions.js';
import Context from '../../../context.js';
import API from '../../../api.js';

import './ViewProfile.css';

export default function ViewProfile(props) {

    let userId = props.userId,
        close = props.close;

    const [userLogin, setUserLogin] = useState('');
    const [userFullName, setUserFullName] = useState('');
    const [userActivity, setUserActivity] = useState({text: 'Был(а) в сети давно'})

    useEffect(() => {
        (async () => {

            let api_getUsers= await API('/Users/getUsers', { usersId: [userId] }),
                user = api_getUsers.data.users[ 0 ];
            
            setUserLogin(user.login);
            setUserFullName(user.fullName);

            let api_getActivity = await API('/Users/getActivity', { usersId: [userId] });

            if (api_getActivity.data.activity.length === 0)
                return setUserActivity('Был(а) в сети давно');

            let date = api_getActivity.data.activity[ 0 ].date;
                
            let activity = timeDiff(date);

            setUserActivity( activity );

        })();
    }, [userId]);

    return (
        <Modal title="Информация" close={ close } >
            <div className="view-profile">
                <div className="view-profile__card">
                    <img className="view-profile__img" src="img/avatar.png" alt=""/>
                    <div className="view-profile__content">
                        <b className="view-profile__fullname">{ userFullName }</b>
                        <span className={'view-profile__activity' + (userActivity.isOnline ? ' online' : '')}>{ userActivity.text }</span>
                    </div>
                </div>
                <div className="view-profile__info">
                    <div className="view-profile__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" d="M0 0h24v24H0V0z"/>
                            <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        </svg>
                    </div>
                    <div className="view-profile__text">
                        <div className="view-profile__row">
                            <div className="view-profile__field">@{ userLogin }</div>
                            <div className="view-profile__label">Имя пользователя</div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}