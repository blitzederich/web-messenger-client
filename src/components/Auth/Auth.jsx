import React, {useState} from 'react';

import './Auth.css';

import FormSignIn from './FormSignIn/FormSignIn.jsx';
import FormSignUp from './FormSignUp/FormSignUp.jsx';

function Auth(props) {

    const [showSignIn, setShowSignIn] = useState(true);

    return  showSignIn ? <FormSignIn switch={ setShowSignIn } /> : <FormSignUp switch={ setShowSignIn } />;
}

export default Auth;