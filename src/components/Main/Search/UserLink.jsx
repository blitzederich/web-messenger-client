import React, {useContext} from 'react';

import Context from '../../../context.js';

import './UserLink.css';

function UserLink(props) {

    const { setPeerId } = useContext(Context);

    let user = props.user,
        setSearch = props.setSearch;

    const onLinkClick = e => {
        e.preventDefault();
        setPeerId(user.id);
        setSearch('');
    }
    
    return (
        <a className="user-link" href="" onClick={ onLinkClick }>
            <img className="user-link__img" src="img/avatar.png"/>
            <div className="user-link__content">
                <div className="user-link__head">
                    <b className="user-link__peer">{ user.fullName }</b>
                </div>
                <div className="user-link__text">@{ user.login }</div>
            </div>
        </a>
    );
}

export default UserLink;