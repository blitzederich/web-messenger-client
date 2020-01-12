import React, {useRef} from 'react';

import './DarkScreen.css';

export default function DarkScreen(props) {

    let close               = props.close,
        hiding              = props.hiding,
        parentAnimationHide = props.parentAnimationHide;

    const onDarkScreenAnimationEnd = e => e.target.classList.remove('animation');

    let refDarkScreen = useRef();
    const onDarkScreenClick = (e) => {
        let darkScreenHTML = refDarkScreen.current
        if (e.target !== darkScreenHTML)
            return;

        animationHide(() => {
            close();
        });

        if (parentAnimationHide) {
            parentAnimationHide();
        }
    }

    const animationHide = (callback) => {

        let darkScreenHTML = refDarkScreen.current;
        darkScreenHTML.classList.add('animation','reverse');
        darkScreenHTML.addEventListener('animationend', () => {
            darkScreenHTML.classList.remove('reverse');

            if (callback) {
                callback();
            }
        });

    }

    if (hiding) {
        animationHide();
    }

    return (
        <div className="dark-screen animation" ref={ refDarkScreen } onClick={ onDarkScreenClick } onAnimationEnd={ onDarkScreenAnimationEnd }>
            { props.children }
        </div>
    );
    
}