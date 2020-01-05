import React from 'react';


export const formatDate = date => {
    date = new Date(date);
    let getHours = date.getHours(),
        getMinutes = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes(),
        getDate  = date.getDate(),
        getMonth = (date.getMonth() + 1) < 10 ? '0'+(date.getMonth() + 1) : date.getMonth() + 1,
        getYear  = date.getFullYear().toString().slice(2);

    if (new Date().getDate() !== getDate)
        return getDate + '.' + getMonth + '.' + getYear;

    return getHours + ':' + getMinutes;
}

/**
 * 
 * @param {number} date 
 * 
 * @returns {{
 *  isOnline?: boolean,
 *  isWriting?: boolean
 *  text: string,
 * }}
 * 
 */

export const timeDiff = (date) => {

    date = new Date(date);

    let nowDate = new Date(),
        diffDate    = nowDate.getDate()     - date.getDate(),
        diffHours   = nowDate.getHours()    - date.getHours(),
        diffMinutes = nowDate.getMinutes()  - date.getMinutes();

    if (diffDate !== 0)
        return {text: `Был(а) в сети ${ date.getDate() }.${ date.getMonth() + 1 }.${ date.getFullYear() }`};

    if (diffHours !== 0)
        return {text: `Был(а) в сети в ${ date.getHours() }:${ date.getMinutes() }`};

    if (diffMinutes < 5) 
        return {isOnline: true, text: `В сети`};

    let modulo = diffMinutes % 10;

    if ((modulo === 1) && (diffMinutes > 15))
        return {text: `Был(а) в сети ${diffMinutes} минуту назад`};

    if (((modulo === 2) || (modulo === 3) || (modulo === 4)) && diffMinutes > 15)
        return {text: `Был(а) в сети ${diffMinutes} минуты назад`};

    return {text: `Был(а) в сети ${diffMinutes} минут назад`};
}

export const scanLinkFromText = text => {

    let regExp = /(https?:\/\/[.\w/\w-=?&#]+)/gi,
        split = text.split(regExp);

    if (split.length < 3) 
        return text;

    return split.map((element, i) => {
        if (regExp.test(element))
            return <a href={ element } className="message__link" target="_blank" rel="noreferrer noopener" key={ i }>{ element }</a>;
        else
            return element;
    });

}