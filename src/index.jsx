import '@babel/polyfill';
import 'fetch-polyfill';

import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';

import Loading from './components/Loading/Loading.jsx';
import Auth from './components/Auth/Auth.jsx';
import Main from './components/Main/Main.jsx';


import reducerDialogs from './reducers/reducerDialogs.js';
import reducerMessages from './reducers/reducerMessages.js'

import Context from './context.js';
import API from './api.js'

import Users from './store/Users.js';

import'./index.css';

function App() {

    const [isLogin, setIsLogin] = useState(null);
    const [userLogin, setUserLogin] = useState('');
    const [userFullName, setUserFullName] = useState('');

    const [peerId, setPeerId] = useState(false);

    const [dialogs, dispatchDialogs] = useReducer(reducerDialogs, []);
    const [messages, dispatchMessages] = useReducer(reducerMessages, []);

    const [isActiveTab, setIsActiveTab] = useState(true);
    useEffect(() => {
        const onWindowBlur = () => setIsActiveTab(false);
        const onWindowFocus = () => setIsActiveTab(true);

        window.addEventListener('blur', onWindowBlur);
        window.addEventListener('focus', onWindowFocus);

    }, []);


    useEffect(() => {
        (async () => {

            let api_isLogin = await API('/Auth/isLogin');
            if (!api_isLogin.status) 
                return setIsLogin(false);

            let userId = api_isLogin.data.userId;
    
            setIsLogin(userId);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (isLogin === null) return;
            if (isLogin === false) return;
             
            let getUsers = await Users.getUsers([isLogin]),
                user     = getUsers[ isLogin ];

            setUserLogin(user.login);
            setUserFullName(user.fullName);
        })();
    }, [isLogin]);

    useEffect(() => {
        dispatchMessages({type: 'init', messages: []});
    }, [peerId]);

    const Provider = {
        isActiveTab,
        isLogin, setIsLogin,
        userLogin, userFullName,
        peerId, setPeerId,
        dialogs, dispatchDialogs,
        messages, dispatchMessages
    };

    if (isLogin === null) return <Loading />;

    return (
        <Context.Provider value={ Provider }>
            { isLogin ? <Main /> : <Auth /> }
        </Context.Provider>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);