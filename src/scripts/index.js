// 1. capturar elementos que tendran animacion
let animationElements = Array.from(document.querySelectorAll('[data-scroll-animation]'))

// 2. Agregar clases segun el parametro data
animationElements.forEach(element => {
  element.classList.add(`${element.dataset.scrollAnimation}`)
})

const handleScroll = () => {

  // 2. Capturar scroll de usuario
  let scrollTop = document.documentElement.scrollTop

  // 3. comparar la altura de cada elemento y el scroll para activar la animacion
  animationElements.forEach(element => {
    if (element.offsetTop - (window.innerHeight / 2) < scrollTop) {
      element.classList.remove(`${element.dataset.scrollAnimation}`)
    } else if (element.offsetTop - window.innerHeight > scrollTop) {
      element.classList.add(`${element.dataset.scrollAnimation}`)
    }
  })
}


// 5. activar comprobacion en scroll
window.addEventListener('scroll', handleScroll)




