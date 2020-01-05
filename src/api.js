const API = async (url, data) => {

    const URL = `/api${ url }`;
    const options = {};

    if (data) {
        options.method  = 'POST';
        options.headers = { 'Content-Type': 'application/json' };
        options.body    = JSON.stringify(data);
    }

    let res  = await fetch(URL, options),
        json = await res.json();

    return Promise.resolve(json);

}

export default API;