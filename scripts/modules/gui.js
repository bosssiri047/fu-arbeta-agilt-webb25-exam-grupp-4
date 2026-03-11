import { createCartItem } from "../components/cart.js";
import { createHamburgerMenu } from "../components/navigation.js";
import { createProduct } from "../components/product.js";
import { getElement } from "../utils/domutils.js";
import { fetchProducts } from "./api.js";
import { getCart, getCartCount } from "./localeStroage.js";

export function renderHamburgerMenu() {
	getElement(".header").innerHTML += createHamburgerMenu();
}

export function moveBurgerTopLeft() {
	getElement(".header__burger-label").classList.add(
		"header__burger-label--top-left",
	);
}

export function renderProducts(products) {
	console.log(products);
	products.items.forEach((product) => {
		console.log(product);
		console.log(createProduct(product));
		getElement(".menu__list").innerHTML += createProduct(product);
	});
}

//CART
export function renderCart(products) {
	renderCartAlertCount();
	const cart = getCart();
	const ulRef = document.querySelector("#cartList");
	ulRef.innerHTML = "";
	let totalPrice = 0;

	for (let item of cart) {
		const product = products.find(
			(product) => Number(product.id) === Number(item.id),
		);
		// console.log(product);
		ulRef.innerHTML += createCartItem(product, item.count);
		totalPrice += item.count * product.price;
	}

	document.querySelector("#cartTotalPrice").textContent = `${totalPrice} SEK`;
}

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
