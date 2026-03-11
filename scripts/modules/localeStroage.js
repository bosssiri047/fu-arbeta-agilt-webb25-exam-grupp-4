// CART

import { fetchProducts } from "./api.js";

//Add a single item to cart by id
export function addToCart(productId) {
	let cart = getCart();

	const existingItem = findItem(cart, productId);

	if (existingItem) {
		console.log("product is already in cart, added 1 to count");
		existingItem.count++;
	} else {
		console.log("product was not in cart, added it and set count to 1");
		const item = {
			id: productId,
			count: 1,
		};
		cart.push(item);
	}

	saveCart(cart);
}

//Remove a single item from cart by id
export function removeFromCart(productId) {
	let cart = getCart();

	let existingItem = findItem(cart, productId);

	if (existingItem) {
		if (existingItem.count <= 1 && cart.length === 1) {
			console.log("Reducing product by 1 caused the cart to be emptied");
			emptyCart();
			return;
		} else if (existingItem.count <= 1) {
			console.log(
				"Product count is 0, splicing out the object from the cart",
			);
			let index = cart.indexOf(existingItem);
			cart.splice(index, 1);
		} else {
			console.log("Reducing count of product by 1");
			existingItem.count--;
		}

		saveCart(cart);
	} else {
		console.log("Product not found in cart");
	}
}

//Get cart count for use on the cart icon
export function getCartCount() {
	let cart = getCart();
	let count = 0;

	for (let item of cart) {
		count += item.count;
	}
	return count;
}

//Empties out cart
export function emptyCart() {
	console.log("Cart emptied out and removed from local storage");
	localStorage.removeItem("cartList");
}

//Returns cart array if it exists or an empty array
export function getCart() {
	const existingCart = localStorage.getItem("cartList");

	if (existingCart) {
		console.log("Cart exists in local storage");
		return JSON.parse(existingCart);
	} else {
		console.log("Cart doesn't exist in local storage");
		return [];
	}
}

//Helper function to check if item exists in cart, if it does it returns the items reference in the array, if not it returns undefined/null
function findItem(cart, productId) {
	return cart.find((item) => item.id === productId);
}

//Helper function to save cart
function saveCart(cart) {
	console.log("Cart saved and pushed to local storage");
	localStorage.setItem("cartList", JSON.stringify(cart));
}

// ORDER HISTORY

export async function addOrderToHistory(cart) {
	const products = await fetchProducts();

	for (let item of cart) {
	}
}
