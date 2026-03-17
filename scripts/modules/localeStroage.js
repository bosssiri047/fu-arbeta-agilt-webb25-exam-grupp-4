// CART

import { getElement } from "../utils/domutils.js";
import { fetchProducts, fetchUsers } from "./api.js";
import { editUserName } from "./gui.js";

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

	//Adds a userId if logged in
	const loggedInUser = userLoggedIn();
	if (loggedInUser !== "guest") {
		currentOrder.userId = getCurrentUserId();
	} else {
		currentOrder.userId = "guest";
	}

	//pushing in each product in to the products array
	for (let item of cart) {
		const productData = products.find(
			(product) => Number(product.id) === Number(item.id),
		);

		// console.log(productData);
		const totalPrice = productData.price * item.count;

		//adding on to total price of the whole order each loop
		currentOrder.totalPrice += totalPrice;

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
		return { error: "No order found by that ID" };
	}
}

// Fetches the oder history if it exists or returns an empty array
export function getOrderHistory() {
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
// Changed some names so that it makes more sense to be used for both order id and user id.
function setUniqueId(comparisonArray) {
	let isDone = false;
	let uniqueId;

	while (!isDone) {
		uniqueId = "";

		for (let i = 0; i < 10; i++) {
			const randomNumber = Math.floor(Math.random() * 10);
			uniqueId += randomNumber;
		}

		const existingId = comparisonArray.find((item) => item.id === uniqueId);

		if (!existingId) {
			isDone = true;
		}
	}

	return uniqueId;
}

// LOGIN
export function setCurrentUser(user) {
	const currentUser = {
		id: user.id,
		role: user.role,
		// id later
	};

	localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

//Function to help figure out what to show on the site
export function userLoggedIn() {
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));
	if (currentUser) {
		if (currentUser.role === "admin") {
			return "admin";
		} else {
			return "user";
		}
	} else {
		return "guest";
	}
}

export function getCurrentUserId() {
	const user = JSON.parse(localStorage.getItem("currentUser"));
	return user.id || null;
}

//Removes the currentUser localstorage / loggin out
export function logOut() {
	localStorage.removeItem("currentUser");
}

// REGISTRATION

//Helper function to use Jesper's userList API to populate our own localstorage. Use once manually then don't call this function again.
export async function setStarterUserList() {
	const { users: userList } = await fetchUsers();

	for (let user of userList) {
		user.id = setUniqueId(userList);
	}

	localStorage.setItem("userList", JSON.stringify(userList));
}

//Fetches the whole user list array
export function getUserList() {
	const existingUserList = localStorage.getItem("userList");

	if (existingUserList) {
		console.log("UserList exist in local storage");
		return JSON.parse(existingUserList);
	} else {
		console.log("userList doesn't exist in local storage");
		return [];
	}
}

//Fetches a user object by ID
export function getUserById(id) {
	const userList = getUserList();
	const user = userList.find((user) => user.id === id);

	if (user) {
		return user;
	} else {
		return { error: "No user found by that ID" };
	}
}

//Create a user and push it in to local storage
export function createUser(username, email, password) {
	const userList = getUserList();
	const user = {
		id: setUniqueId(userList),
		username: username,
		email: email,
		password: password,
		role: "user",
		profile_image: "",
	};

	userList.push(user);

	localStorage.setItem("userList", JSON.stringify(userList));
}

//Profile Edits
export function editLocaleImage(users, currentUser) {
	let updatedUserList = users;
	const editedImg = getElement('.profile-img').src;
	const profileRef = updatedUserList.find((user) => user.id === currentUser);
	profileRef.profile_image = editedImg;
	localStorage.setItem("userList", JSON.stringify(updatedUserList));
}

export function editLocaleUserName(users, currentUser) {
	let updatedUserList = users;
	const editedUserName = getElement('.profile-username').textContent.slice(10);
	const profileRef = updatedUserList.find((user) => user.id === currentUser);
	profileRef.username = editedUserName;
	localStorage.setItem("userList", JSON.stringify(updatedUserList));
}

export function editLocalePassword(users, currentUser) {
	let updatedUserList = users;
	const editedPassword = getElement('.profile-password').textContent.slice(10);
	const profileRef = updatedUserList.find((user) => user.id === currentUser);
	profileRef.password = editedPassword;
	localStorage.setItem("userList", JSON.stringify(updatedUserList));
}

export function editLocaleEmail(users, currentUser) {
	let updatedUserList = users;
	const editedEmail = getElement('.profile-email').textContent.slice(7);
	const profileRef = updatedUserList.find((user) => user.id === currentUser);
	profileRef.email = editedEmail;
	localStorage.setItem("userList", JSON.stringify(updatedUserList));
}