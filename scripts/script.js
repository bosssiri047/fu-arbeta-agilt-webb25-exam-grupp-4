import { fetchProducts, fetchUsers } from "./modules/api.js";
import {
	moveBurgerTopLeft,
	renderCart,
	renderCartAlertCount,
	renderHamburgerMenu,
	renderProducts,
	filterMenu,
	renderMap,
	closeMap,
	renderKvitto,
	renderHistory,
} from "./modules/gui.js";
import {
	addOrderToHistory,
	addToCart,
	emptyCart,
	getCart,
	getOrderById,
	getOrderHistory,
	logOutUser,
	removeFromCart,
	setCurrentUser,
} from "./modules/localeStroage.js";
import {
	getElement,
	getElementAll,
	addClass,
	removeClass,
} from "./utils/domutils.js";

if (
	window.location.pathname === "/" ||
	window.location.pathname.includes("index.html")
) {
	console.log("index.html");
	pageSetup();
} else if (window.location.pathname.includes("foodtruck.html")) {
	console.log("foodtruck.html");
	foodtruckSetup();
} else if (window.location.pathname.includes("menu.html")) {
	console.log("menu.html");
	menuSetup();
} else if (window.location.pathname.includes("cart.html")) {
	console.log("cart.html");
	cartSetup();
} else if (window.location.pathname.includes("receipt.html")) {
	console.log("receipt.html");
	receiptSetup();
} else if (window.location.pathname.includes("order.html")) {
	console.log("order.html");
	orderSetup();
} else if (window.location.pathname.includes("profile.html")) {
	console.log("profile.html");
	profileSetup();
}

function pageSetup() {
	renderHamburgerMenu();
	renderCartAlertCount();
}
function foodtruckSetup() {
	renderHamburgerMenu();
	loadFoodtruckEventListeners();
	renderCartAlertCount();
}

async function menuSetup() {
	renderHamburgerMenu();
	const products = await fetchProducts();
	console.log(products);
	renderProducts(products);
	renderCartAlertCount();

	const menuRef = getElementAll(".menu__list-item");
	console.log(menuRef);

	const wontonFilterRef = getElement("#filter__wonton");
	const dipFilterRef = getElement("#filter__dip");
	const drinkFilterRef = getElement("#filter__drink");

	wontonFilterRef.addEventListener("click", (event) => {
		if (event.target.classList.contains("button-active")) {
			removeClass(event.target, "button-active");
			renderProducts(products);
		} else {
			filterMenu("wonton", products);
			addClass(event.target, "button-active");
			removeClass(dipFilterRef, "button-active");
			removeClass(drinkFilterRef, "button-active");
		}
	});
	dipFilterRef.addEventListener("click", (event) => {
		if (event.target.classList.contains("button-active")) {
			removeClass(event.target, "button-active");
			renderProducts(products);
		} else {
			filterMenu("dip", products);
			addClass(event.target, "button-active");
			removeClass(wontonFilterRef, "button-active");
			removeClass(drinkFilterRef, "button-active");
		}
	});
	drinkFilterRef.addEventListener("click", (event) => {
		if (event.target.classList.contains("button-active")) {
			removeClass(event.target, "button-active");
			renderProducts(products);
		} else {
			filterMenu("drink", products);
			addClass(event.target, "button-active");
			removeClass(wontonFilterRef, "button-active");
			removeClass(dipFilterRef, "button-active");
		}
	});
}

async function cartSetup() {
	renderHamburgerMenu();
	moveBurgerTopLeft();
	const products = await fetchProducts();
	renderCart(products.items);

	if (getCart().length > 0) {
		console.log("loaded cart event listeners");
		loadCartEventListeners(products.items);
	}
}

function orderSetup() {
	const params = new URLSearchParams(window.location.search);
	const value = params.get("orderId");
	if (value) {
		document.querySelector("#orderId").textContent = `#${value}`;
		loadOrderEventListeners(value);
	}
}

function receiptSetup() {
	const params = new URLSearchParams(window.location.search);
	const id = params.get("orderId");
	const products = getOrderById(id);
	console.log(products);
	if (id) {
		document.querySelector(".receipt__id").textContent = `#${id}`;
	}
	renderKvitto(products);
}

async function profileSetup() {
	renderHamburgerMenu();
	const logOutBtnRef = getElement('.logoutBtn');
	const profileImgRef = getElement('.profile-img');
	const usernameRef = getElement('.profile-username');
	const passwordRef = getElement('.profile-password');
	const emailRef = getElement('.profile-email');
	const editUsernameRef = getElement('.username-edit');
	const editPasswordRef = getElement('.password-edit');
	const editEmailRef = getElement('.email-edit');
	const users = await fetchUsers();
	const orders = getOrderHistory();
	console.log(users);
	setCurrentUser(users.users[0]);
	if(!users.users[0].profile_image) {
		profileImgRef.src = '../res/logo_transparent.png';
	} else {
		profileImgRef.src = users.users[0].profile_image;
	}
	usernameRef.textContent += users.users[0].username;
	passwordRef.textContent += users.users[0].password;
	emailRef.textContent += users.users[0].email;
	renderHistory(orders);

	logOutBtnRef.addEventListener("click", (event) => {
		logOutUser();
		window.location.pathname = "index.html";
	});

	editUsernameRef.addEventListener("click", (event) => {
		let newUsername = prompt("Please enter your new username", "");
		if (newUsername != null) {
		  usernameRef.textContent = `Username: ${newUsername}`;
		}
	});

	editPasswordRef.addEventListener("click", (event) => {
		let newPassword = prompt("Please enter your new password", "");
		if (newPassword != null) {
		  passwordRef.textContent = `Password: ${newPassword}`;
		}
	});

	editEmailRef.addEventListener("click", (event) => {
		let newEmail = prompt("Please enter your new email", "");
		if (newEmail != null) {
		  emailRef.textContent = `Email: ${newEmail}`;
		}
	});
}

// EVENT LISTENERS

// FOODTRUCK PAGE
function loadFoodtruckEventListeners() {
	document
		.querySelector("#foodTruckContainer")
		.addEventListener("click", (event) => {
			const click = event.target;

			if (click.closest("#foodTruck1")) {
				console.log("foodtruck1");
				renderMap(1);
			} else if (click.closest("#foodTruck2")) {
				console.log("foodtruck2");
				renderMap(2);
			} else if (click.closest("#foodTruck3")) {
				console.log("foodtruck3");
				renderMap(3);
			} else if (click.closest("#foodTruck4")) {
				console.log("foodtruck4");
				renderMap(4);
			}
		});
}

export function loadMapEventListeners() {
	document
		.querySelector("#mapCloseBtn")
		.addEventListener("click", (event) => {
			closeMap();
		});
}

// CART
function loadCartEventListeners(products) {
	document.querySelector("#emptyCart").addEventListener("click", () => {
		const cart = getCart();

		if (cart) {
			emptyCart();
			renderCart();
		}
	});

	document.querySelector("#cartList").addEventListener("click", (event) => {
		const click = event.target.closest(".cart__adjust-btn");

		if (click) {
			if (click.textContent === "+") {
				addToCart(click.dataset.id);
			} else if (click.textContent === "-") {
				removeFromCart(click.dataset.id);
			}
			renderCart(products);
		}
	});

	document.querySelector("#checkoutBtn").addEventListener("click", () => {
		const cart = getCart();

		if (cart) {
			const orderId = addOrderToHistory(cart, products);
			// console.log(orderId);
			emptyCart();
			document.querySelector("#cartList").innerHTML = "";
			// console.log(getOrderById(orderId));
			location.href = `./order.html?orderId=${orderId}`;
		}
	});
}

// ORDER

function loadOrderEventListeners(orderId) {
	document.querySelector("#viewReceipt").addEventListener("click", () => {
		location.href = `./receipt.html?orderId=${orderId}`;
	});
}
