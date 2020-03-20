"use strict";

var animationElements = Array.from(document.querySelectorAll('[data-scroll-animation]'));
animationElements.forEach(function (element) {
  element.classList.add("".concat(element.dataset.scrollAnimation));
});

var handleScroll = function handleScroll() {
  var scrollTop = document.documentElement.scrollTop;
  animationElements.forEach(function (element) {
    if (element.offsetTop - window.innerHeight / 2 < scrollTop) {
      element.classList.remove("".concat(element.dataset.scrollAnimation));
    } else if (element.offsetTop - window.innerHeight > scrollTop) {
      element.classList.add("".concat(element.dataset.scrollAnimation));
    }
  });
};

window.addEventListener('scroll', handleScroll);