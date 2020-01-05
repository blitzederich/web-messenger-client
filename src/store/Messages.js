import {EventEmitter} from 'events';
import API from '../api.js';

class StoreMessages extends EventEmitter {
    constructor() {
        super();

        this.dialogsIsInit = false;

        this.dialogs = [];
        this.messages = {};

    }

    async getDialogs() {

        if (!this.dialogsIsInit) {

            let api_getDialogs = await API('/Messages/getDialogs'),
                dialogs        = api_getDialogs.data.dialogs;

            this.dialogs = dialogs;
            this.dialogsIsInit = true;

        }

        return Promise.resolve(...this.dialogs);

    }

    async getHistory(peerId, offset=0, limit=50) {

        if (!Array.isArray(this.messages[ peerId ])) {
            this.messages[ peerId ] = [];
        }
        
        let history = this.messages[ peerId ].slice(offset, offset + limit);

        if (history.length === limit) {
            return Promise.resolve( history );
        }

        let localOffset = offset + history.length,
            localLimit  = limit  - history.length;
    
        let api_getHistory = await API('/Messages/getHistory', { peerId, offset: localOffset, limit: localLimit }),
            offsetHistory  = api_getHistory.data.messages.reverse();

        history.unshift(offsetHistory);
        this.messages[ peerId ].unshift(offsetHistory);

        return Promise.resolve(history);

    }

    pushMessages(messages) {

        this.pushDialogs(messages);
        this.pushHistory(messages);
        
    }

    pushDialogs(messages) {

        messages.map((newMessage) => {
            let filteredDialogs = this.dialogs.filter(message => message.peerId !== newMessage.peerId);
            this.dialogs = [newMessage, ...filteredDialogs];
        });

        this.emit('updateDialogs:push', [...messages]);
        this.emit('updateDialogs:update', {...this.dialogs});

    }

    pushHistory(messages) {

        messages.map(message => {

            let peerId = message.peerId;

            if (!Array.isArray(this.messages[ peerId ])) {
                this.messages[ peerId ] = [];
            }

            this.messages[ peerId ].push(message);

        });

        this.emit('updateHistory:push', [...messages]);
        this.emit('updateHistory:update', {...this.messages});
    }
    
}

const Messages = new StoreMessages();

window.Messages = Messages;

export default Messages;