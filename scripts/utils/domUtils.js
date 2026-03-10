export function getElement(selector) {
    return document.querySelector(selector);
}

export function getElementAll(selector) {
    return document.querySelectorAll(selector);
}

export function createElement(tagName) {
    return document.createElement(tagName);
}

export function addClass(element, className) {
    element.classList.add(className);
}

export function removeClass(element, className) {
    element.classList.remove(className);
}