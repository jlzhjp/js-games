function hidePreloader () {
  document.querySelector('.preloader-background').style.display = 'none'
  document.querySelector('body').classList.add('fadeInUp')
}

function jsonEquals (x, y) {
  return JSON.stringify(x) === JSON.stringify(y)
}

function randomInt (min, max) {
  return min + ((Math.random() * (max - min)) | 0)
}

function randomItem (arr) {
  return arr[randomInt(0, arr.length)]
}

export { hidePreloader, jsonEquals, randomInt, randomItem }
