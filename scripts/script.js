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
	renderLogin,
	renderRegistration,
} from "./modules/gui.js";
import {
	addOrderToHistory,
	addToCart,
	createUser,
	emptyCart,
	getCart,
	getOrderById,
	getUserList,
	removeFromCart,
	setCurrentUser,
	setStarterUserList,
	userLoggedIn,
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
} else if (window.location.pathname.includes("login.html")) {
	console.log("login.html");
	loginSetup();
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

async function loginSetup() {
	renderLogin();
	renderHamburgerMenu();
	loadLoginEventListeners();
	console.log(`test ${userLoggedIn()}`);
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

//LOGIN

async function loadLoginEventListeners() {
	document
		.querySelector("#loginBtn")
		.addEventListener("click", async (event) => {
			event.preventDefault();

			const userInputRef = document.querySelector("#username");
			const pwInputRef = document.querySelector("#password");
			userInputRef.placeholder = "";
			pwInputRef.placeholder = "";

			const userList = getUserList();
			console.log(userList);

			const validUser = userList.find(
				(user) => user.username === userInputRef.value,
			);

			if (!validUser) {
				userInputRef.classList.add("login__input--error");
				userInputRef.value = "";
				userInputRef.placeholder = "Användarnamn finns inte";
				return;
			} else {
				userInputRef.classList.remove("login__input--error");

				if (validUser.password !== pwInputRef.value) {
					pwInputRef.classList.add("login__input--error");
					pwInputRef.value = "";
					pwInputRef.placeholder = "Fel lösenord";
					return;
				} else {
					setCurrentUser(validUser);
					location.href = "./index.html";
				}
			}
		});

	document
		.querySelector("#goToRegister")
		.addEventListener("click", (event) => {
			event.preventDefault();

			renderRegistration();
			renderHamburgerMenu();
			loadRegistrationEventListeners();
		});
}

//REGISTRATION

function loadRegistrationEventListeners() {
	document
		.querySelector("#registerBtn")
		.addEventListener("click", (event) => {
			event.preventDefault();

			const userList = getUserList();
			const usernameInputRef = document.querySelector("#username");
			const emailInputRef = document.querySelector("#email");
			const pwInputRef = document.querySelector("#password");

			usernameInputRef.classList.remove("login__input--error");
			usernameInputRef.placeholder = "";
			emailInputRef.classList.remove("login__input--error");
			emailInputRef.placeholder = "";
			pwInputRef.classList.remove("login__input--error");
			pwInputRef.placeholder = "";

			if (
				!userList.find(
					(user) =>
						user.username ===
						usernameInputRef.value.trim().toLowerCase(),
				)
			) {
				if (usernameInputRef.value.length !== 0) {
					if (
						!userList.find(
							(user) =>
								user.email ===
								emailInputRef.value.trim().toLowerCase(),
						)
					) {
						if (pwInputRef.value.length >= 8) {
							createUser(
								usernameInputRef.value.trim().toLowerCase(),
								emailInputRef.value.trim().toLowerCase(),
								pwInputRef.value,
							);
							location.href = "./login.html";
						} else {
							pwInputRef.classList.add("login__input--error");
							pwInputRef.value = "";
							pwInputRef.placeholder =
								"Lösenordet måste vara minst 8 karaktärer långt";
						}
					} else {
						emailInputRef.classList.add("login__input--error");
						emailInputRef.value = "";
						emailInputRef.placeholder =
							"Email adressen används redan, vänligen välj en ny";
					}
				} else {
					usernameInputRef.classList.add("login__input--error");
					usernameInputRef.value = "";
					usernameInputRef.placeholder = "Namnet får inte vara tomt";
				}
			} else {
				usernameInputRef.classList.add("login__input--error");
				usernameInputRef.value = "";
				usernameInputRef.placeholder =
					"Namnet används redan, vänligen välj ett nytt";
			}
		});

	document.querySelector("#goToLogin").addEventListener("click", (event) => {
		event.preventDefault();

		renderLogin();
		renderHamburgerMenu();
		loadLoginEventListeners();
	});
}
