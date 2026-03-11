import { createHamburgerMenu } from "../components/navigation.js"
import { createProduct } from "../components/product.js";
import { getElement, getElementAll } from "../utils/domutils.js"
import { getCart, addToCart, getCartCount } from "../modules/localeStroage.js";

export function renderHamburgerMenu () {
    getElement('.header').innerHTML += createHamburgerMenu();
}

//Render the whole menu
export function renderProducts (products) {
    removeMenuRender(); //Remove previous menu render
    //console.log(products);
    products.items.forEach(product => {
        //console.log(product);
        //console.log(createProduct(product));
        getElement('.menu__list').innerHTML += createProduct(product);
    });

    const menuRef = getElementAll('.menu__list-item');
    for(let list of menuRef) {
	    list.addEventListener('click', (event) => {addToCart(list.id), renderCartAlertCount();});
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
	    list.addEventListener('click', (event) => {addToCart(list.id), renderCartAlertCount();});
    }
}

//Remove previous menu render
function removeMenuRender () {
    return getElement('.menu__list').innerHTML = '';
}

//CART
export function renderCartAlertCount() {
	const alertCountRef = document.querySelector("#cartCount");

	if (getCartCount() > 0) {
		alertCountRef.classList.remove("d-none");
		alertCountRef.textContent = getCartCount();
	} else {
		alertCountRef.classList.add("d-none");
		alertCountRef.textContent = "";
	}
}