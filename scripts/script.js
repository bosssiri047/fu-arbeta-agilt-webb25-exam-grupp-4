import { renderHamburgerMenu } from "./modules/gui.js";

if(window.location.pathname === '/' || window.location.pathname.includes ('index.html')) {
    console.log('index.html');
    pageSetup();

} else if(window.location.pathname.includes('foodtruck.html')) {
    console.log('foodtruck.html');
    foodtruckSetup();

} else if(window.location.pathname.includes('menu.html')) {
    console.log('menu.html');
    menuSetup();

} else if(window.location.pathname.includes('cart.html')) {
    console.log('cart.html');
    cartSetup();

} else if(window.location.pathname.includes('receipt.html')) {
    console.log('receipt.html');
    receiptSetup();
}

function pageSetup () {
    renderHamburgerMenu();
}

function foodtruckSetup () {
    
}

async function menuSetup () {
    
}

function cartSetup () {
    
}

function receiptSetup () {
    
}