import React, {useState, useEffect} from 'react';

import Loading from '../../Loading/Loading.jsx';
import UserLink from './UserLink.jsx';

import API from '../../../api.js';

function Search(props) {

    let search    = props.search.trim(),
        setSearch = props.setSearch;

    const [isLoading, setIsLoading] = useState(false);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        setIsLoading(true);

        let timerId = setTimeout(async () => {
            
            let api_search = await API('/Users/search', { textSearch: search }),
                users      = api_search.data.users;

            setUsers(users);
            setIsLoading(false);

        }, 700);

        return () => {
            clearTimeout(timerId);
        }
    }, [search]);

    if (isLoading) return <Loading />;

    return (
        <div className="search">
           {users.map((user, index) => <UserLink user={ user } key={ index } setSearch={ setSearch } />)}
        </div>
    )
}

export default Search;