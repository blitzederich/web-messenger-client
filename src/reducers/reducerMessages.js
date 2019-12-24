export default function reducerMessages(messages, action) {

    switch (action.type) {
        case 'init': {
            return action.messages.reverse();
        }
        case 'push': {
            return [...messages, action.message]
        }
        case 'shift': {
            return [...action.messages.reverse(), ...messages]
        }
        case 'read': {
            return messages.map(message => ({...message, unread: 0}));
        }
        default:
            return messages;
    }
    
}