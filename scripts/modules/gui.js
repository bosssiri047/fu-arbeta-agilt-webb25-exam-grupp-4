import { createHamburgerMenu } from "../components/navigation.js"
import { getElement } from "../utils/domutils.js"

export function renderHamburgerMenu () {
    getElement('.header').innerHTML += createHamburgerMenu();
}