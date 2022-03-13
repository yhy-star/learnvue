export function debounce(fnc, delay) {
  var timeout = null

  return function (...args) {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      fnc.apply(this, args)
    }, delay)
  }
}
