const Connect = {};

Connect.connection = undefined;
Connect.lastEventId = '';
Connect.listeners = {};
Connect.options = { url: '/LongPoll', method: 'GET', timeout: 10*60*1000 };

Connect.connect = () => {
    let xhr = new XMLHttpRequest();
    let {method, url, timeout} = Connect.options;
    xhr.open(method, url + '?' + (Connect.lastEventId ? ('lastEventId=' + Connect.lastEventId + '&') : '') + Math.random());
    xhr.timeout = timeout;
    xhr.send();

    xhr.addEventListener('load', () => {
        let events = JSON.parse(xhr.responseText).events;
        Connect.lastEventId = events.slice(-1)[ 0 ].id;
        Connect.update(events);

        Connect.connect();
    });
    xhr.addEventListener('abort', () => {
        Connect.connect();
    });
    xhr.addEventListener('timeout', () => {
        Connect.connect();
    });
    xhr.addEventListener('error', () => {
        Connect.connect();
    });
    
    Connect.connection = xhr;
}

Connect.update = (events) => {
    events.map(event => {
        for (let id in Connect.listeners)
            Connect.listeners[ id ](event);
    });
}

Connect.addUpdateListener = (callback) => {
    let id = +new Date() + '_' + Math.random();
    Connect.listeners[ id ] = callback;
    return id;
}

Connect.removeUpdateListener = (id) => {
    delete Connect.listeners[ id ];
}



export default Connect;