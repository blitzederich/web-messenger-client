import React, {useState, useContext} from 'react';

import Alert from '../../Alert/Alert.jsx';
import InputRise from '../../InputRise/InputRise.jsx';

import Context from '../../../context.js';
import API from '../../../api.js';

function FormSignIn(props) {

    const setIsLogin = useContext(Context).setIsLogin;
    
    const switchForm = () => props.switch(false);

    const [login, setLogin]       = useState('');
    const [password, setPassword] = useState('');

    const [alertText, setAlertText] = useState(false);

    const onFormSubmit = async e => {
        e.preventDefault();

        let api_signIn = await API('/Auth/signIn', { login, password });
        
        if (!api_signIn.status)
            return setAlertText(api_signIn.warning.text);

        let userId = Number(api_signIn.data.userId);
        setIsLogin(userId);
    }

    return (
        <div className="auth">
            <form className="auth-form" onSubmit={ onFormSubmit }>
                <h1 className="form-header">Авторизация</h1>
                { alertText && 
                    <Alert>
                        <strong>Ошибка.</strong>
                        <p>{ alertText }</p>
                    </Alert> 
                }
                <InputRise label="Логин"  type="text"     setValue={ setLogin }    id={ 'signin__login' }    format={ /[^a-z0-9]/g } transform={ 'lowercase' } />
                <InputRise label="Пароль" type="password" setValue={ setPassword } id={ 'signin__password' } />
                <input className="auth-form__button" type="submit"   value="Войти"/>
                <input className="auth-form__switch" type="button"   value="Регистрация"  onClick={ switchForm } />
            </form>
        </div>
    );
}

export default FormSignIn;