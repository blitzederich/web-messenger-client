/**
 * 
 * @param {*} dialogs 
 * @param {*} action 
 */

export default function reducerDialogs(dialogs, action) {
    switch (action.type) {
        case 'init': {
            return action.dialogs;
        }
        case 'push': {
            let newMessage = action.message,
                newDialogs = dialogs.filter(message => message.peerId !== newMessage.peerId);
            newDialogs.unshift(newMessage);
            return newDialogs;
        }
        case 'read': {
            let peerId = action.userId;
            return dialogs.map(message => message.peerId === peerId ? {...message, unread: 0} : message)
        }
        case 'read:you': {
            let peerId = action.peerId;
            return dialogs.map(message => message.senderId === peerId ? {...message, unread: 0} : message)
        }
        default: 
            return dialogs;
    }
}