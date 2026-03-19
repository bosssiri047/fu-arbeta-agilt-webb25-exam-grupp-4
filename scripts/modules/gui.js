import { createCartItem } from "../components/cart.js";
import { createHamburgerMenu } from "../components/navigation.js";
import { createProduct } from "../components/product.js";
import { getElement, getElementAll, removeClass } from "../utils/domutils.js";
import { getCart, addToCart, getCartCount } from "../modules/localeStroage.js";
import { fetchProducts } from "./api.js";
import { createMapOverlay } from "../components/foodtruck.js";
import { loadMapEventListeners } from "../script.js";
import { createKvittoItem } from "../components/kvitto.js";
import {
	createOrderHistory,
	createOrderHistoryListItem,
} from "../components/history.js";
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
	getElement("#burger").classList.add("header__burger--top-left");
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

	const menuRef = getElementAll(".menu__card");
	for (let button of menuRef) {
		button.addEventListener("click", (event) => {
			(addToCart(button.id), renderCartAlertCount());
			console.log(button.id);
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

	const menuRef = getElementAll(".menu__card");
	for (let button of menuRef) {
		button.addEventListener("click", (event) => {
			(addToCart(button.id), renderCartAlertCount());
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

	document.querySelector("#mapCloseBtn").focus();
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

//Profile Page
export function renderProfile(theUser) {
	const profileImgRef = getElement(".profile-img");
	const usernameRef = getElement(".profile-username");
	const passwordRef = getElement(".profile-password");
	const emailRef = getElement(".profile-email");
	//Render out the correct information according to theUser
	if (!theUser.profile_image) {
		profileImgRef.src = "../res/logo_transparent.png";
	} else {
		profileImgRef.src = theUser.profile_image;
	}

	usernameRef.textContent += theUser.username;
	passwordRef.textContent += theUser.password;
	emailRef.textContent += theUser.email;
}

export function editImage() {
	const imgRef = getElement(".profile-img");
	let newImg = prompt("Please enter image link", "");
	if (newImg != null) {
		imgRef.src = newImg;
	}
}

export function editUserName() {
	const usernameRef = getElement(".profile-username");
	let newUsername = prompt("Please enter your new username", "");
	if (newUsername != null) {
		usernameRef.textContent = `Username: ${newUsername}`;
	}
}

export function editPassword() {
	const passwordRef = getElement(".profile-password");
	let newPassword = prompt("Please enter your new password", "");
	if (newPassword != null && newPassword.length >= 8) {
		passwordRef.textContent = `Password: ${newPassword}`;
	} else {
		newPassword = prompt("The length must be longer than 8", "");
	}
}

export function editEmail() {
	const emailRef = getElement(".profile-email");
	let newEmail = prompt("Please enter your new email", "");
	if (newEmail != null) {
		emailRef.textContent = `Email: ${newEmail}`;
	}
}

export function renderHistory(orders) {
	const uiRef = getElement("#historyList");
	uiRef.innerHTML = "";

	for (let order of orders) {
		uiRef.innerHTML += createOrderHistory(order);
	}
}

export function renderOrderHistory(order) {
	const uiRef = getElement("#orderList");
	uiRef.innerHTML = "";

	for (let product of order.products) {
		uiRef.innerHTML += createOrderHistoryListItem(product);
	}
	getElement(".order__id").textContent = `#${order.id}`;
	getElement("#orderTotalPrice").textContent = `${order.totalPrice} SEK`;

	const closerRef = getElement(".closer");
	removeClass(closerRef, "d-none");
}
