import { fetchProducts } from "./modules/api.js";
import {
	filterMenu,
	renderHamburgerMenu,
	renderProducts,
	renderCartAlertCount,
} from "./modules/gui.js";
import { addToCart } from "./modules/localeStroage.js";
import {
	getElementAll,
	getElement,
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
}

function pageSetup() {
	renderHamburgerMenu();
}
function foodtruckSetup() {
	renderHamburgerMenu();
	loadFoodtruckEventListeners();
}

async function menuSetup() {
	renderHamburgerMenu();
	const products = await fetchProducts();
	//console.log(products);
	renderProducts(products);
	renderCartAlertCount();

	//FILTER BUTTONS
	const wontonFilterRef = getElement("#filter__wonton");
	const dipFilterRef = getElement("#filter__dip");
	const drinkFilterRef = getElement("#filter__drink");

	wontonFilterRef.addEventListener("click", (event) => {
		if(event.target.classList.contains("button-active")) {
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
		if(event.target.classList.contains("button-active")) {
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
		if(event.target.classList.contains("button-active")) {
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

function cartSetup() {
	renderHamburgerMenu();
}

function receiptSetup() {
	renderHamburgerMenu();
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
			} else if (click.closest("#foodTruck2")) {
				console.log("foodtruck2");
			} else if (click.closest("#foodTruck3")) {
				console.log("foodtruck3");
			} else if (click.closest("#foodTruck4")) {
				console.log("foodtruck4");
			}
		});
}
