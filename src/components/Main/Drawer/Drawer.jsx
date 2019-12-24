import React, {useState, useContext, useEffect, useRef} from 'react';

import DarkScreen from '../DarkScreen/DarkScreen.jsx';

import API from '../../../api.js';
import Context from '../../../context.js';

import './Drawer.css';

export default function Drawer(props) {

    const {userLogin, userFullName} = useContext(Context);

    const onExitClick = async (e) => {
        e.preventDefault();

        let api_logOut = await API('/Auth/logOut');
        if (api_logOut.status)
            location.reload();
    }

    /*** Touch ***/

    let clientX, 
        clientY;

    const onTouchStart = e => {
        refDrawer.current.style.transition = '0s';

        clientX = e.touches[ 0 ].clientX;
        clientY = e.touches[ 0 ].clientY;
    }

    const onTouchMove = e => {
        let difX = clientX - e.touches[ 0 ].clientX,
            difY = clientY - e.touches[ 0 ].clientY;

        if (difX < 0) return;

        refDrawer.current.style.left = -difX + 'px';

    }

    const onTouchEnd = e => {
        if (parseInt(refDrawer.current.style.left) < -80)
            props.close();
        
        refDrawer.current.style.transition = '.2s';
        refDrawer.current.style.left = '0';
        clientX, clientY = undefined;
    }

    /*** Touch end ***/

    const refDrawer = useRef();    

    return (
        <DarkScreen onClick={ props.close }>
            <div 
                className="drawer" 
                ref={ refDrawer }
                onLoad={ () => { refDrawer.current.classList.add('active') }}
                onTouchStart={ onTouchStart }
                onTouchMove={ onTouchMove } 
                onTouchEnd={ onTouchEnd }
            >

                <div className="drawer__card">
                    <img className="drawer__img" src="img/avatar.png" alt="" />
                    <div className="drawer__info">
                        <b className="drawer__fullname">{ userFullName }</b>
                        <span className="drawer__login">@{userLogin}</span>
                    </div>
                </div>

                <div className="drawer__options">
                    <a href="" className="drawer__link" onClick={ e => e.preventDefault() }>
                        <div className="drawer__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.1-1.65c.2-.15.25-.42.13-.64l-2-3.46c-.12-.22-.4-.3-.6-.22l-2.5 1c-.52-.4-1.08-.73-1.7-.98l-.37-2.65c-.06-.24-.27-.42-.5-.42h-4c-.27 0-.48.18-.5.42l-.4 2.65c-.6.25-1.17.6-1.7.98l-2.48-1c-.23-.1-.5 0-.6.22l-2 3.46c-.14.22-.08.5.1.64l2.12 1.65c-.04.32-.07.65-.07.98s.02.66.06.98l-2.1 1.65c-.2.15-.25.42-.13.64l2 3.46c.12.22.4.3.6.22l2.5-1c.52.4 1.08.73 1.7.98l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.6-.25 1.17-.6 1.7-.98l2.48 1c.23.1.5 0 .6-.22l2-3.46c.13-.22.08-.5-.1-.64l-2.12-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
                            </svg>
                        </div>
                        <div className="drawer__text">Настройки</div>
                    </a>
                    <a href="" className="drawer__link" onClick={ onExitClick }>
                        <div className="drawer__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="none" d="M0 0h24v24H0z"/>
                                <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
                            </svg>
                        </div>
                        <div className="drawer__text">Выход</div>
                    </a>
                </div>

            </div>
        </DarkScreen>
    );
}