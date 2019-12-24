import React, {useState, useEffect, useRef, useContext} from 'react';

import Loading from '../../Loading/Loading.jsx';
import Message from './Message.jsx';

import './ChatHistory.css';

import API from '../../../api.js';
import Context from '../../../context.js';

export default function ChatHistory() {

    const {
        isLogin, 
        peerId,
        messages, dispatchMessages,
        dispatchDialogs
    } = useContext(Context);

    const [isMountLoading, setIsMountLoading] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const refIsEnd = useRef();
    refIsEnd.current = isEnd;

    const refHistoryHTML = useRef();

    useEffect(() => {
        (async () => {

            let api_getHistory = await API('/Messages/getHistory', { peerId }),
                history = api_getHistory.data.messages;

            if (history.length < 50)
                setIsEnd(true);
   
            dispatchDialogs({ type: 'read:you', peerId });
            dispatchMessages({ type: 'init', messages: history });
    
            setIsMountLoading(false);
    
            let historyHTML = refHistoryHTML.current;
            historyHTML.scrollTop = historyHTML.scrollHeight;

        })();
        return () => {
            setIsMountLoading(true);
            setIsEnd(false);
        }
    }, [peerId]);
    


    const [isScroll, setIsScroll] = useState(0);
    const refIsScroll = useRef();

    refIsScroll.current = isScroll;

    useEffect(() => {

        let historyHTML = refHistoryHTML.current;

        if (refIsScroll.current < 1)
            historyHTML.scrollTop = historyHTML.scrollHeight;

    });

    /*** infinite scroll ***/

    const [isFetching, setIsFetching] = useState(false);
    const refIsFetching = useRef();

    refIsFetching.current = isFetching;

    const onHistoryScroll = async e => {

        if (messages.length < 50) return;

        let element = e.target;

        setIsScroll(element.scrollHeight - element.offsetHeight - element.scrollTop);

        if (isEnd) return;
        if (refIsFetching.current) return;
        if (element.scrollTop !== 0) return;

        let scrollHeight = element.scrollHeight;

        setIsFetching(true);

        let api_getHistory = await API('/Messages/getHistory', {peerId, offset: messages.length}),
            offsetHistory = api_getHistory.data.messages;

        if (offsetHistory.length < 50)
            setIsEnd(true);

        dispatchMessages({type: 'shift', messages: offsetHistory});
        element.scrollTop = element.scrollHeight - scrollHeight;

        setIsFetching(false);

    }

    useEffect(() => {
        let resize = e => {
            if (refIsScroll.current < 1) {
                let historyHTML = refHistoryHTML.current;
                historyHTML.scrollTop = historyHTML.scrollHeight;
            }
        }
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        }
    });

    const ChatLoading = <div className="chat__loading"><Loading /></div>;

    return (
        <div className="chat__history-wrap-out" ref={ refHistoryHTML } onScroll={ onHistoryScroll }>
            <div className="chat__history-wrap">
                <div className="chat__history">
                    { isMountLoading 
                        ? <Loading /> 
                        : isEnd 
                            ? null 
                            : ChatLoading
                    }
                    { messages.map((message, index) => <Message message={ message } isLogin={ isLogin } key={ index } />) }
                </div>
            </div>
        </div>
    )
}