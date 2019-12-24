const Connect = {};

Connect.connection = undefined;
Connect.listeners = {};
Connect.options = { url: '/LongPoll', method: 'GET', timeout: 10*60*1000 };

Connect.connect = () => {
    let xhr = new XMLHttpRequest();
    let {method, url, timeout} = Connect.options;
    xhr.open(method, url + '?' + Math.random());
    xhr.timeout = timeout;
    xhr.send();
    xhr.addEventListener('load', () => {
        let event = JSON.parse(xhr.responseText).event;
        Connect.update(event);
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

Connect.update = (event) => {
    for (let id in Connect.listeners)
        Connect.listeners[ id ](event);
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