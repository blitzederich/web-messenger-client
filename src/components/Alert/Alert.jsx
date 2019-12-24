import React, {useState} from 'react';

import './Alert.css';

function Alert(props) {
    return <div className="alert alert-danger">{ props.children }</div>;
}

export default Alert;