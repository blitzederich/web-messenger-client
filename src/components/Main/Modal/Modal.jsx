import React, {useState, useRef} from 'react';

import DarkScreen from '../../DarkScreen/DarkScreen.jsx';

import './Modal.css';

/**
 * 
 * @param {{
 *  title: string
 *  close: Function
 * }} props
 * 
 */

export default function Modal(props) {

    let title = props.title,
        close = props.close;

    const [hiding, setHiding] = useState(false);

    const onModalAnimationEnd = e => e.target.classList.remove('animation');

    const onModalClose = () => {
        setHiding(true);
        animationHide(() => {
            close();
        });
    }

    let refModal = useRef();
    const animationHide = (callback) => {
        let modalHTML = refModal.current;
        modalHTML.classList.add('animation', 'reverse');
        modalHTML.addEventListener('animationend', e => {
            modalHTML.classList.remove('reverse');
            if (callback) {
                callback();
            }
        });
    }

    return (
        <DarkScreen close={ close } parentAnimationHide={ animationHide } hiding={ hiding }>
            <div className="modal animation" ref={ refModal } onAnimationEnd={ onModalAnimationEnd }>
                <div className="modal__head">
                    <b className="modal__name">{ title }</b>
                    <div className="modal__close" onClick={ onModalClose } >

                        <svg className="icon__close" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" d="M0 0h24v24H0V0z"/>
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                        </svg>

                        <svg className="icon__back" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z"></path>
                        </svg>

                    </div>
                </div>
                <div className="modal__body">{ props.children }</div>
            </div>
        </DarkScreen>
    );
}