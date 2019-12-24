import React, {useState} from 'react';

import './InputRise.css';

function InputRise({ label, id, type, format, transform, setValue}) {

    const refLabel = React.createRef();

    const onInputFocus = e => refLabel.current.classList.add('active');

    const onInputBlur = e => {
        if (format !== undefined)
            e.target.value = e.target.value.trim();

        if (e.target.value === '')
            refLabel.current.classList.remove('active');
    }

    const onInputChange = e => {
        if (format !== undefined) {
            switch (transform) {
                case 'lowercase':
                    e.target.value = e.target.value.toLowerCase();
                    break;
                case 'uppercase':
                    e.target.value = e.target.value.toUpperCase();
                    break;
                default:
                    break;
            }
            e.target.value = e.target.value.replace(format, '');
        }

        setValue(e.target.value);
    }
    
    return (
        <div className="input-rise">
            <label className="input-rise__label" ref={ refLabel } htmlFor={ id }>{ label }</label>
            <input
                className="input-rise__input"
                autoComplete="off" 
                maxLength="32"
                type={ type } 
                id={ id } 
                onFocus={ onInputFocus } 
                onBlur={ onInputBlur } 
                onChange={ onInputChange }
            />
        </div>
    )
}

export default InputRise;