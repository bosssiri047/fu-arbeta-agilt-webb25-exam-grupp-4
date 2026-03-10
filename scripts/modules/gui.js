import { createHamburgerMenu } from "../components/navigation.js"
import { createProduct } from "../components/product.js";
import { getElement } from "../utils/domutils.js"

export function renderHamburgerMenu () {
    getElement('.header').innerHTML += createHamburgerMenu();
}

export function renderProducts (products) {
    console.log(products);
    products.items.forEach(product => {
        console.log(product);
        console.log(createProduct(product));
        getElement('.menu__list').innerHTML += createProduct(product);
    });
}