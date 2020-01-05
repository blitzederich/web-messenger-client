import {EventEmitter} from 'events';
import API from '../api.js';

class StoreUsers extends EventEmitter {
    constructor() {
        super();

        this.users = {};

    }

    /**
     * 
     * @param {Array<number>} usersId 
     */
    async getUsers(usersId) {

        let offsetUsersId = [],
            cachedUsers = {};

        usersId.map(id => {
            
            if (this.users[ id ] === undefined) {
                return offsetUsersId.push(id);
            }

            cachedUsers[ id ] = this.users[ id ];

        });

        if (usersId.length === Object.keys(cachedUsers).length) {
            return Promise.resolve({...cachedUsers});
        }

        let api_getUsers = await API('/Users/getUsers', { usersId }),
            offsetUsers  = api_getUsers.data.users;

        this.users = {...this.users, ...offsetUsers};

        return Promise.resolve({...cachedUsers, ...offsetUsers});

    }
}

const Users = new StoreUsers();

window.Users = Users;

export default Users;