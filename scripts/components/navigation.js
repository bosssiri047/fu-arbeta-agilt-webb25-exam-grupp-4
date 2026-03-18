import { userLoggedIn } from "../modules/localeStroage.js";

export function createHamburgerMenu() {
	console.log(userLoggedIn());
	const loginProfile =
		userLoggedIn() === "guest"
			? `<a href="./login.html" class="nav-bar__link">Logga In</a>`
			: `<a href="./profile.html" class="nav-bar__link">Min Profil</a>`;

	return `
        <input type="checkbox" class="header__burger" id="burger"/>
        <label tabindex="0" role="button" for="burger" class="header__burger-label" aria-label="hamburger-menu">
            <span class="header__burger-btn"></span>
        </label>
        <nav class="nav-bar">
            <ul class="nav-bar__list">
                <li class="nav-bar__item">
                    <a href="./index.html" class="nav-bar__link">Hemsida</a>
                </li>
                <li class="nav-bar__item">
                    <a href="./menu.html" class="nav-bar__link">Meny</a>
                </li>
                <li class="nav-bar__item">
                    <a href="./cart.html" class="nav-bar__link">Kundvagn</a>
                </li>
                <li class="nav-bar__item">
                    <a href="./foodtruck.html" class="nav-bar__link">Foodtruckarna</a>
                </li>
                <li class="nav-bar__item">
                    ${loginProfile}
                </li>
            </ul>
        </nav>
    `;
}
