import React, {useState, useRef} from 'react';

import './DarkScreen.css';

export default function DarkScreen(props) {

    const refDarkScreen = useRef();

    const onCustomClick = (e) => {
        if (e.target !== refDarkScreen.current)
            return;

        props.onClick();
    }

    const [style, setStyle] = useState();

    return <div className="dark-screen" onLoad={() => setStyle({ backgroundColor: 'rgba(0,0,0,.6)' })} style={ style } onClick={ onCustomClick } ref={ refDarkScreen } >{ props.children }</div>
    
}