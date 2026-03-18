import { createCartItem } from "../components/cart.js";
import { createHamburgerMenu } from "../components/navigation.js";
import { createProduct } from "../components/product.js";
import { getElement, getElementAll } from "../utils/domutils.js";
import { getCart, addToCart, getCartCount } from "../modules/localeStroage.js";
import { fetchProducts } from "./api.js";
import { createMapOverlay } from "../components/foodtruck.js";
import { loadMapEventListeners } from "../script.js";
import { createKvittoItem } from "../components/kvitto.js";
import { createLogin } from "../components/login.js";
import { createRegistration } from "../components/registration.js";
import { createCartoverlay } from "../components/cartOverlay.js";

export function renderHamburgerMenu() {
	getElement(".header").innerHTML += createHamburgerMenu();
}

export function moveBurgerTopLeft() {
	getElement(".header__burger-label").classList.add(
		"header__burger-label--top-left",
	);
}

//Render the whole menu
export function renderProducts(products) {
	removeMenuRender(); //Remove previous menu render
	//console.log(products);
	products.items.forEach((product) => {
		//console.log(product);
		//console.log(createProduct(product));
		getElement(".menu__list").innerHTML += createProduct(product);
	});

	const menuRef = getElementAll(".menu__list-item");
	for (let list of menuRef) {
		list.addEventListener("click", (event) => {
			(addToCart(list.id), renderCartAlertCount());
		});
	}
}

//Render only specific filter menu
export function filterMenu(type, products) {
	removeMenuRender(); //Remove previous menu render
	let filterList = [];
	products.items.forEach((product) => {
		if (product.type === type) {
			filterList.push(product);
		}
	});

	filterList.forEach((product) => {
		//console.log(product);
		//console.log(createProduct(product));
		getElement(".menu__list").innerHTML += createProduct(product);
	});

	const menuRef = getElementAll(".menu__list-item");
	for (let list of menuRef) {
		list.addEventListener("click", (event) => {
			(addToCart(list.id), renderCartAlertCount());
		});
	}
}

//Remove previous menu render
function removeMenuRender() {
	return (getElement(".menu__list").innerHTML = "");
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

export function renderCartOverlay() {
	document.querySelector("body").innerHTML += createCartoverlay();
	console.log("cartOverlay");
}

//FOODTRUCK
export function renderMap(id) {
	const bodyRef = document.querySelector("body");
	const divRef = document.createElement("div");
	divRef.classList.add("map-overlay");
	divRef.innerHTML = createMapOverlay(id);

	bodyRef.appendChild(divRef);
	loadMapEventListeners();
}

export function closeMap() {
	document.querySelector(".map-overlay").remove();
}

//Kvitto
export function renderKvitto(products) {
	const ulRef = document.querySelector("#receiptList");
	ulRef.innerHTML = "";

	for (let item of products.products) {
		ulRef.innerHTML += createKvittoItem(item);
	}

	document.querySelector("#receiptTotalPrice").textContent =
		`${products.totalPrice} SEK`;
}

//LOGIN

export function renderLogin() {
	clearLoginReg();
	const bodyRef = document.querySelector("body");
	bodyRef.innerHTML = createLogin();
}

export function renderRegistration() {
	clearLoginReg();
	const bodyRef = document.querySelector("body");
	bodyRef.innerHTML = createRegistration();
}

export function clearLoginReg() {
	document.querySelector("body").innerHTML = "";
}
