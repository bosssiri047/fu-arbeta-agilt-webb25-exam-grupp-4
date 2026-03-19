import { fetchProducts, fetchUsers } from "./modules/api.js";
import {
  moveBurgerTopLeft,
  renderCart,
  renderCartAlertCount,
  renderHamburgerMenu,
  renderProducts,
  renderLogin,
  renderRegistration,
  filterMenu,
  renderMap,
  closeMap,
  renderKvitto,
  renderHistory,
  renderProfile,
  editUserName,
  editPassword,
  editEmail,
  renderOrderHistory,
  editImage,
  renderCartOverlay,
} from "./modules/gui.js";
import {
  addOrderToHistory,
  addToCart,
  createUser,
  emptyCart,
  getCart,
  getCurrentUserId,
  getOrderById,
  getOrderHistory,
  getUserList,
  logOut,
  removeFromCart,
  setCurrentUser,
  setStarterUserList,
  userLoggedIn,
  editLocaleUserName,
  editLocalePassword,
  editLocaleEmail,
  editLocaleImage,
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
} else if (window.location.pathname.includes("profile.html")) {
  console.log("profile.html");
  profileSetup();
} else if (window.location.pathname.includes("aboutus.html")) {
  console.log("aboutus.html");
  aboutusSetup();
}

//Set starter users
// setStarterUserList();

function pageSetup() {
  renderHamburgerMenu();
  renderCartAlertCount();
  // vicent lagt till
  updateCartPreviewContent();
  setUpCartPreview();
}
function foodtruckSetup() {
  renderHamburgerMenu();
  loadFoodtruckEventListeners();
  renderCartAlertCount();
  // vincent lagt till
  updateCartPreviewContent();
  setUpCartPreview();
}

function aboutusSetup() {
  renderHamburgerMenu();
  renderCartAlertCount();
  // vicent lagt till
  updateCartPreviewContent();
  setUpCartPreview();
}

async function menuSetup() {
  renderHamburgerMenu();
  const products = await fetchProducts();
  console.log(products);
  renderProducts(products);
  renderCartAlertCount();
  // Vincent lagt till
  updateCartPreviewContent();
  setUpCartPreview();

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

async function profileSetup() {
  renderHamburgerMenu();
  const logOutBtnRef = getElement(".logoutBtn");
  const editImgRef = getElement(".profile-img");
  const editUsernameRef = getElement(".usernameBtn-edit");
  const editPasswordRef = getElement(".passwordBtn-edit");
  const editEmailRef = getElement(".emailBtn-edit");
  const currentUser = getCurrentUserId();
  const users = getUserList();
  console.log(users);
  console.log(currentUser);
  const orders = getOrderHistory();
  //Finding the current login user by filtering through Jesper's API users with currentUser's name in localeStorage
  const theUser = users.find((user) => user.id === currentUser);
  console.log(theUser);

  //Render profile informations
  renderProfile(theUser);

  //Order history render
  if (theUser.role === "admin") {
    renderHistory(orders);
  } else {
    const theUserHistory = [];
    for (let order of orders) {
      if (order.userId === theUser.id) {
        theUserHistory.push(order);
      }
    }
    renderHistory(theUserHistory);
  }

  //Logout listener button
  logOutBtnRef.addEventListener("click", (event) => {
    logOut();
    window.location.pathname = "index.html";
  });

  //Edit buttons
  editImgRef.addEventListener("click", (event) => {
    editImage();
    editLocaleImage(users, currentUser);
  });

  editUsernameRef.addEventListener("click", (event) => {
    editUserName();
    editLocaleUserName(users, currentUser);
  });

  editPasswordRef.addEventListener("click", (event) => {
    editPassword();
    editLocalePassword(users, currentUser);
  });

  editEmailRef.addEventListener("click", (event) => {
    editEmail();
    editLocaleEmail(users, currentUser);
  });

  const closerRef = getElement(".closer");
  //Order history listener
  const historyItemsRef = getElementAll(".history__btn");
  historyItemsRef.forEach((item) => {
    item.addEventListener("click", (event) => {
      const order = getOrderById(event.target.closest("button").id);
      console.log(order);
      renderOrderHistory(order);
      closerRef.focus();
    });
  });

  //Pop up closer listener

  closerRef.addEventListener("click", (event) => {
    addClass(closerRef, "d-none");
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      if (!closerRef.classList.contains("d-none")) {
        addClass(closerRef, "d-none");
      }
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
  document.querySelector("#mapCloseBtn").addEventListener("click", (event) => {
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
      if (userLoggedIn() === "guest") {
        renderCartOverlay();
        loadCartOverlayEventListeners(cart, products);
      } else {
        const orderId = addOrderToHistory(cart, products);
        emptyCart();
        document.querySelector("#cartList").innerHTML = "";
        location.href = `./order.html?orderId=${orderId}`;
      }
    }
  });
}

function loadCartOverlayEventListeners(cart, products) {
  document.querySelector("#cartLoginBtn").addEventListener("click", () => {
    location.href = "./login.html";
  });

  document.querySelector("#cartContinueBtn").addEventListener("click", () => {
    const orderId = addOrderToHistory(cart, products);
    emptyCart();
    document.querySelector("#cartList").innerHTML = "";
    location.href = `./order.html?orderId=${orderId}`;
  });
}

// ORDER

function loadOrderEventListeners(orderId) {
  document.querySelector("#viewReceipt").addEventListener("click", () => {
    location.href = `./receipt.html?orderId=${orderId}`;
  });

  document
    .querySelector("#viewReceipt")
    .addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        location.href = `./receipt.html?orderId=${orderId}`;
      }
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

  document.querySelector("#goToRegister").addEventListener("click", (event) => {
    event.preventDefault();

    renderRegistration();
    renderHamburgerMenu();
    loadRegistrationEventListeners();
  });
}

//REGISTRATION

function loadRegistrationEventListeners() {
  document.querySelector("#registerBtn").addEventListener("click", (event) => {
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
        (user) => user.username === usernameInputRef.value.trim().toLowerCase(),
      )
    ) {
      if (usernameInputRef.value.length !== 0) {
        if (
          !userList.find(
            (user) => user.email === emailInputRef.value.trim().toLowerCase(),
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

// CART UPDATEPREVEW
async function updateCartPreviewContent() {
  const cart = getCart(); // Hämta Jonathans funktion
  const products = await fetchProducts(); // Hämta Jonathans funktion
  const preview = document.getElementById("cartPreview");

  if (!preview) return;

  if (cart.length === 0) {
    preview.innerHTML = "<p>Varukorgen är tom</p>";
    return;
  }

  let html = "<h3>Din varukorg</h3><ul>";
  let total = 0;

  cart.forEach((item) => {
    // avbild av Jonathans kod addOrderToHistory!
    const product = products.items.find((p) => p.id == item.id);

    if (product) {
      const radSumma = product.price * item.count;
      html += `<li>${product.name} x${item.count} - ${radSumma} SEK</li>`;
      total += radSumma;
    }
  });

  html += `</ul><p><strong>Totalt: ${total} SEK</strong></p>`;
  preview.innerHTML = html;
}

// CART PREVIEW
function setUpCartPreview() {
  // Hoppa över om vi är på cart.html
  if (window.location.pathname.includes("cart.html")) {
    // console.log("Hoppar över preview på cart.html");
    return;
  }

  let cartLink = document.querySelector(".header__cart-link");
  let preview = document.querySelector("#cartPreview");

  // console.log("cartlink:", cartLink);
  // console.log("preview", preview);

  // if kolla efter cart
  if (!cartLink) {
    // console.log("Länken hittades inte");
    return;
  }
  if (!preview) {
    // console.log("Previw hittades inte");
    return;
  }

  // Uppdatera innehåll direkt
  updateCartPreviewContent();

  // HOVER för desktop
  cartLink.addEventListener("mouseenter", () => {
    if (window.innerWidth > 768) {
      updateCartPreviewContent();
      preview.classList.add("show");
    }
  });

  cartLink.addEventListener("mouseleave", () => {
    if (window.innerWidth > 768) {
      preview.classList.remove("show");
    }
  });

  // KLICK för mobil (uppdatering)
  cartLink.addEventListener("click", (event) => {
    if (window.innerWidth <= 768) {
      // Om preview redan syns → gå till cart.html
      if (preview.classList.contains("show")) {
        // Låt länken fungera normalt (gå till cart.html)
        return; // Lämnar funktionen, så eventet fortsätter som vanligt
      } else {
        // Annars visa preview och stoppa navigation
        event.preventDefault();
        updateCartPreviewContent();
        preview.classList.add("show");
      }
    }
  });

  // Stäng vid klick utanför (mobil)
  document.addEventListener("click", (event) => {
    if (window.innerWidth <= 768) {
      if (!cartLink.contains(event.target) && !preview.contains(event.target)) {
        preview.classList.remove("show");
      }
    }
  });

  // Hindra stängning vid klick inuti preview
  preview.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}
