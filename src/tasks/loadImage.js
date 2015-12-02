import Promise from 'bluebird';

import config from '../config';


export default function loadImage({src=config.DEFAULT_IMAGE, preventCache=true} = {}) {

    let imageUrl = src;

    if (preventCache && imageUrl.indexOf('http') === 0) {
        if (imageUrl.indexOf('?') > -1) {
            imageUrl += '&r' + Math.random();
        } else {
            imageUrl += '?r' + Math.random();
        }
    }

    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = imageUrl;
        return img;
    });


}

