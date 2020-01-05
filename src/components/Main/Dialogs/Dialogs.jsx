import React, {useState, useEffect, useContext} from 'react';

import Loading from '../../Loading/Loading.jsx';
import DialogLink from './DialogLink.jsx';

import './Dialogs.css';

import Context from '../../../context.js';
import API from '../../../api.js';

function Dialogs() {

    const [isLoading, setIsLoading] = useState(false);

    const {dialogs, dispatchDialogs} = useContext(Context);

    useEffect(() => {
        (async () => {

            if (dialogs.length !== 0) return;

            setIsLoading(true);
            
            let api_getDialogs = await API('/Messages/getDialogs'),
                initDialogs    = api_getDialogs.data.dialogs;

            dispatchDialogs({type: 'init', dialogs: initDialogs});

            setIsLoading(false);
        })();
    }, []);

    if (isLoading) return <Loading />;

    return (
        <div className="dialogs">
            {dialogs.map((message, index) => <DialogLink message={ message } key={ index } />)}
        </div>
    )

}

export default Dialogs;