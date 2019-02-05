'use strict'

function hidePreloader() {
    document.querySelector('.preloader-background').style.display = 'none'
    document.querySelector('body').classList.add('fadeInUp')
}

function jsonEquals(x, y) {
    return JSON.stringify(x) === JSON.stringify(y)
}

export {
    hidePreloader,
    jsonEquals,
}