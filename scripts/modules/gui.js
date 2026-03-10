import { createHamburgerMenu } from "../components/navigation.js"
import { createProduct } from "../components/product.js";
import { getElement, getElementAll } from "../utils/domutils.js"
import { addToCart } from "../modules/localeStroage.js";

export function renderHamburgerMenu () {
    getElement('.header').innerHTML += createHamburgerMenu();
}

//Render the whole menu
export function renderProducts (products) {
    //console.log(products);
    products.items.forEach(product => {
        //console.log(product);
        //console.log(createProduct(product));
        getElement('.menu__list').innerHTML += createProduct(product);
    });

    const menuRef = getElementAll('.menu__list-item');
    for(let list of menuRef) {
	    list.addEventListener('click', (event) => {addToCart(list.id)});
    }
}

//Render only specific filter menu
export function filterMenu (type, products) {
    removeMenuRender(); //Remove previous menu render
    let filterList = [];
    products.items.forEach(product => {
        if(product.type === type) {
            filterList.push(product);
        }
    });

    filterList.forEach(product => {
        //console.log(product);
        //console.log(createProduct(product));
        getElement('.menu__list').innerHTML += createProduct(product);
    });

    const menuRef = getElementAll('.menu__list-item');
    for(let list of menuRef) {
	    list.addEventListener('click', (event) => {addToCart(list.id)});
    }
}

//Remove previous menu render
function removeMenuRender () {
    return getElement('.menu__list').innerHTML = '';
}