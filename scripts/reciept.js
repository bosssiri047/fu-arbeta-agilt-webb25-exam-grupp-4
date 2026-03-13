import { orderRecipt } from "./components/receipt.js";
import { getOrderById } from "./modules/localeStroage.js";
import { renderHamburgerMenu } from "./modules/gui.js";
import { getElement } from "./utils/domutils.js";

export function receiptSetup() {
  // via hamburger menu
  renderHamburgerMenu();

  // ska hämta urlId unikt (orderId=1252525)
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("orderId");

  // om det inte finns någon orderId - visa fel
  if (!orderId) {
    getElement("main").innerHTML = "<p>Hittade inte order</p>";
    return;
  }

  // hämta ordern med ID från localStorage J funktion
  const order = getOrderById(orderId);

  // om ordern inte finns eller är tom - visa order är tom
  if (!order || order.length === 0) {
    getElement("main").innerHTML = "<p>Order är tom</p>";
    return;
  }

  // visa kvitto med funktion v skapat
  getElement("main").innerHTML = orderRecipt(order);
  console.log("order ska visas", order);

  // knapp beställ ny order
}
