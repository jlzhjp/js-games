'use strict'

function hidePreloader() {
    document.querySelector('.preloader-background').style.display = 'none'
    document.querySelector('body').classList.add('fadeInUp')
}

function disableProductionTip(vue) {
    if (window.location.host === 'jlzhjp.github.io') {
        vue.config.productionTip = false
    }
}

function jsonEquals(x, y) {
    return JSON.stringify(x) === JSON.stringify(y)
}

export {
    hidePreloader,
    disableProductionTip,
    jsonEquals,
}