import '@babel/polyfill';
import 'fetch-polyfill';

import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';

import Loading from './components/Loading/Loading.jsx';
import Auth from './components/Auth/Auth.jsx';
import Main from './components/Main/Main.jsx';

//import reducerUsers from './reducers/reducerUsers.js';
import reducerDialogs from './reducers/reducerDialogs.js';
import reducerMessages from './reducers/reducerMessages.js'

import Context from './context.js';
import API from './api.js'

import'./index.css';

function App() {

    const [isLogin, setIsLogin] = useState(null);
    const [userLogin, setUserLogin] = useState('');
    const [userFullName, setUserFullName] = useState('');

    const [peerId, setPeerId] = useState(false);

    //const [users, dispatchUsers] = useReducer(reducerUsers, []);
    const [dialogs, dispatchDialogs] = useReducer(reducerDialogs, []);
    const [messages, dispatchMessages] = useReducer(reducerMessages, []);

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
             
            let api_getUsers = await API('/Users/getUsers', { usersId: [isLogin] }),
                user = api_getUsers.data.users[ 0 ];

            setUserLogin(user.login);
            setUserFullName(user.fullName);
        })();
    }, [isLogin]);

    useEffect(() => {
        dispatchMessages({type: 'init', messages: []});
    }, [peerId]);

    const Provider = {
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

/*
window.onerror = (event, source, lineno, colno, error) => {
    alert(event);
    alert(source);
    alert(error);
    return false;
}
*/