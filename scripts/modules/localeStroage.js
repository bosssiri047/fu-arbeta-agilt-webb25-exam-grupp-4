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

//saves new order to the history and returns the unique id
export function addOrderToHistory(cart, products) {
	console.log(products);
	const orderHistory = getOrderHistory();
	const uniqueId = setUniqueId(orderHistory);
	const date = new Date();
	const currentOrder = {
		id: uniqueId,
		date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`,
		products: [],
		totalPrice: 0,
	};

	//pushing in each product in to the products array
	for (let item of cart) {
		const productData = products.find(
			(product) => Number(product.id) === Number(item.id),
		);

		// console.log(productData);
		const totalPrice = productData.price * item.count;

		//adding on to total price of the whole order each loop
		currentOrder.totalPrice += productData.price;

		const product = {
			id: item.id,
			name: productData.name,
			count: item.count,
			price: productData.price,
			totalPrice: totalPrice,
		};
		currentOrder.products.push(product);
	}

	orderHistory.push(currentOrder);
	console.log(orderHistory);
	localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
	return uniqueId;
}

// Gets the order using id match, else returns an empty array
export function getOrderById(id) {
	const orderHistory = getOrderHistory();
	const order = orderHistory.find((order) => order.id === id);

	if (order) {
		return order;
	} else {
		return [];
	}
}

// Fetches the oder history if it exists or returns an empty array
function getOrderHistory() {
	const existingHistory = localStorage.getItem("orderHistory");

	if (existingHistory) {
		console.log("Order history exists in local storage");
		return JSON.parse(existingHistory);
	} else {
		console.log("Order history doesn't exist in local storage");
		return [];
	}
}

// Randomly generates an id and loops until the generated id is not present in the order history
function setUniqueId(orderHistory) {
	let isDone = false;
	let uniqueId;

	while (!isDone) {
		uniqueId = "";

		for (let i = 0; i < 10; i++) {
			const randomNumber = Math.floor(Math.random() * 10);
			uniqueId += randomNumber;
		}

		const existingId = orderHistory.find((order) => order.id === uniqueId);

		if (!existingId) {
			isDone = true;
		}
	}

	return uniqueId;
}