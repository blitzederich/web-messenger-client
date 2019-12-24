export default function reducerUsers(users, action) {

    switch (action.type) {
        case 'init': { 
            return action.users;
        }

        default:
            return users;
    }
}
