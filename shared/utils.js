'use strict'

function hidePreloader() {
    document.querySelector('.preloader-background').style.display = 'none'
    document.querySelector('body').classList.add('fadeInUp')
}

function jsonEquals(x, y) {
    return JSON.stringify(x) === JSON.stringify(y)
}

function random(min, max) {
    return min + ((Math.random() * (max - min)) | 0)
}

function randomItem(arr) {
    return arr[random(0, arr.length)]
}

export {
    hidePreloader,
    jsonEquals,
    random,
    randomItem,
}
