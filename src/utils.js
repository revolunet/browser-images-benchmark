import config from './config';

const addToDom = (el, child) => {
    return el.appendChild(child);
}

//const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const pad = (value, char='0', length=2) => {
    while ((''+value).length < length) value = '0' + value;
    return value;
};

function time(promise, stats={}) {
    let start = (new Date()).getTime();
    return promise.then(() => {
        return {
            ...stats,
            duration: (new Date()).getTime() - start
        }
    });
}

function repeat(count, job) {
    return time(Array.from(new Array(count), () => null).reduce(function(promise, item) {
        return promise.then(function() {
            return job().catch(()=>{});
        });
    }, Promise.resolve()), {
        count
    });
}

const pickImageName = () => `thumb-${pad(randomInt(1, 120 + 1), '0', 4)}`;

const pickImage = () => `images/${pickImageName()}.jpg`;


function loadImage({src, preventCache=true} = {}) {

    let imageUrl = src;

    if (!imageUrl) {
        imageUrl = pickImage();
    }

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


export default {
    pickImageName: pickImageName,
    pickImage: pickImage,
    loadImage: loadImage,
    repeat: repeat,
    addToDom: addToDom
};

