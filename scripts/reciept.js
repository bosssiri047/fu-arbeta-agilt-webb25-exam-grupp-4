import { orderRecipt } from "./components/receipt.js";
import { getOrderById } from "./modules/localeStroage.js";
import { renderHamburgerMenu } from "./modules/gui.js";
import { getElement } from "../utils/domutils.js";

export function receiptSetup() {
  renderHamburgerMenu();

  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("order");

  if (!orderId) {
    getElement("main").innerHTML = "<p>Hittade inte order</p>";
    return;
  }

  // hämta jonathans
  const order = getOrderById(orderId);

  if (!order || length === 0) {
    getElement("main").innerHTML = "<p>Order är tom</p>";
    return;
  }
  // skriv ut (visa kvitto)
  getElement("main").innerHTML = orderRecipt(order);
}
