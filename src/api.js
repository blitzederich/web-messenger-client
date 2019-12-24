const API = async (url, data) => {

    const URL = `/api${url}`;
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    let json = await fetch(URL, options),
        res  = await json.json();

    return Promise.resolve(res);

}

export default API;