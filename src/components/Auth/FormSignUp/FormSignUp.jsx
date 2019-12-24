import React, {useState, useContext} from 'react';

import Alert from '../../Alert/Alert.jsx';
import InputRise from '../../InputRise/InputRise.jsx';

import Context from '../../../context.js';
import API from '../../../api.js';

function FormSignUp(props) {

    const setIsLogin = useContext(Context).setIsLogin;

    const switchForm = () => props.switch(true);

    const [fullName, setFullName] = useState('');
    const [login, setLogin]       = useState('');
    const [password, setPassword] = useState('');

    const [alertText, setAlertText] = useState(false);

    const onFormSubmit = async e => {
        e.preventDefault();

        let api_signUp = await API('/Auth/signUp', { fullName: fullName.trim(), login, password });
        
        if (!api_signUp.status)
            return setAlertText(api_signUp.warning.text);

        let userId = Number(api_signUp.data.userId);
        setIsLogin(userId);
    } 

    return (
        <div className="auth">
            <form className="auth-form" onSubmit={ onFormSubmit }>
                <h1 className="form-header">Регистрация</h1>
                { alertText && 
                    <Alert>
                        <strong>Ошибка.</strong>
                        <p>{ alertText }</p>
                    </Alert> 
                }
                <InputRise label="Полное имя" type="text"     setValue={ setFullName } id={ 'signup__full-name' } format={ /[^a-zа-я ]/gi } />
                <InputRise label="Логин"      type="text"     setValue={ setLogin }    id={ 'signup__login' }     format={ /[^a-z0-9]/gi } transform={ 'lowercase' } />
                <InputRise label="Пароль"     type="password" setValue={ setPassword } id={ 'signup__password' } />
                <input className="auth-form__button" type="submit"   value="Зарегистрироваться" />
                <input className="auth-form__switch" type="button"   value="Авторизация" onClick={ switchForm } />
            </form>
        </div>
    );
}

export default FormSignUp;