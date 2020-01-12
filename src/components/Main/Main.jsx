import React, {useState, useContext, useEffect, useRef} from 'react';

import Dialogs from './Dialogs/Dialogs.jsx';
import Search from './Search/Search.jsx';
import Chat from './Chat/Chat.jsx';
import Drawer from './Drawer/Drawer.jsx';

import API from '../../api.js';
import Context from '../../context.js';
import Connect from '../../Connect.js';

import './Main.css';

function Main(props) {  
    
    const {isActiveTab, peerId, dispatchDialogs, dispatchMessages} = useContext(Context);

    const refPeerId = useRef();
    refPeerId.current = peerId;

    const refIsActiveTab = useRef();
    refIsActiveTab.current = isActiveTab;

    useEffect(() => {
        Connect.connect();

        let listenerId = Connect.addUpdateListener(event => {

            switch (event.type) {
                case 'message': {
                    let message = event.data;

                    dispatchDialogs({type: 'push', message: message});

                    if (refPeerId.current === message.peerId) {
                        dispatchMessages({type: 'push', message: message});
                        dispatchDialogs({type: 'read:you', peerId: refPeerId.current });
                        
                        API('/Messages/readHistory', { peerId: refPeerId.current});

                        if (!refIsActiveTab.current) {
                            refAudio.current.play();
                        }

                    } else {
                        refAudio.current.play();
                    }

                    break;
                }
                case 'message:read': {
                    if (refPeerId.current === event.data.peerId)
                        dispatchMessages({type: 'read'});
                    
                    dispatchDialogs({type: 'read', userId: event.data.peerId});
                    break;
                }
                default:
                    break;
            }
            
        });
        return () => {
            Connect.removeUpdateListener(listenerId);
        }
    }, []); 
   

    const [search, setSearch] = useState('');

    const onInputChange = e => setSearch(e.target.value);

    const [drawerIsView, setDrawerIsView] = useState(false);
    const onNavClick = e => setDrawerIsView(true);

    const refAudio = useRef();

    return (
        <>
            <main className="main">
                <div className="left-side">
                    <div className="left-side__head">
                        <button className="nav-toggle" type="button" onClick={ onNavClick }>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                            </svg>
                        </button>
                        <input className="search-input" type="text" placeholder="Найти пользователя..." value={ search } onChange={ onInputChange } />
                    </div>
                    { search === '' ? <Dialogs /> : <Search search={ search } setSearch={ setSearch } /> }
                </div>
                <div className={'right-side' + (peerId ? ' active' : '')}>
                    { peerId ? <Chat /> : null }
                </div>
            </main>
            { drawerIsView ? <Drawer close={ () => setDrawerIsView(false) } /> : null }
            <audio ref={ refAudio } preload="auto" src="/sound/new-message.mp3"></audio>
        </>
    );
}

export default Main;