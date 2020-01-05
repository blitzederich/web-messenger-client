import React, {useState, useContext, useRef} from 'react';

import './ChatForm.css';

import API from '../../../api.js';
import Context from '../../../context.js';

function ChatForm() {

    const {
        peerId, 
        dispatchDialogs, 
        dispatchMessages
    } = useContext(Context);

    const [text, setText] = useState('');

    const onFormSubmit = async e => {
        e.preventDefault();

        refBtnSubmit.current.setAttribute('disabled','');

        let form = e.target,
            recipientId = peerId;

        if (text.trim().length === 0) {
            refBtnSubmit.current.removeAttribute('disabled');
            return;
        };

        let api_sendMessage = await API('/Messages/sendMessage', { recipientId, text });

        if (!api_sendMessage.status) {
            refBtnSubmit.current.removeAttribute('disabled');
            return alert(api_sendMessage.warning.text);   
        } 

        form.reset();
        setText('');
        refSubmit.current.classList.remove('active');


        let message = api_sendMessage.data;
        dispatchDialogs({type: 'push', message: message});

        if (message.recipientId !== message.senderId)
            dispatchMessages({type: 'push', message: message});

        refBtnSubmit.current.removeAttribute('disabled');

    }

    const onInputChange = e => {
        if (e.target.value.trim() !== '')
            refSubmit.current.classList.add('active');
        else
            refSubmit.current.classList.remove('active');
        setText(e.target.value);
    }

    const onSubmitClick = e => {
        refInput.current.focus();
    }

    const refInput = useRef();
    const refSubmit = useRef();
    const refBtnSubmit = useRef();

    return (
        <form className="chat__form" onSubmit={ onFormSubmit }>
            
            <div className="chat__attach">
                <button type="button" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"></path>
                    </svg>
                </button>
            </div>

            <input type="text" className="chat__input" placeholder="Написать сообщение..." value={ text } onChange={ onInputChange }  ref={ refInput } />

            <div className="chat__submit" ref={ refSubmit } >
                <button type="submit" ref={ refBtnSubmit } onClick={ onSubmitClick } >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                        <path d="M0 0h24v24H0z" fill="none"></path>
                    </svg>
                </button>
            </div>
        </form>
    );
}

export default ChatForm;