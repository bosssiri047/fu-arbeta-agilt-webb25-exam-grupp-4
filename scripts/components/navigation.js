export function createHamburgerMenu () {
    return `
        <input type="checkbox" class="header__burger" id="burger"/>
        <label for="burger" class="header__burger-label" aria-label="hamburger-menu">
            <span class="header__burger-btn"></span>
        </label>
        <nav class="nav-bar">
            <ul class="nav-bar__list">
                <li class="nav-bar__item">
                    <a href="./index.html" class="nav-bar__link nav-bar__link">Home</a>
                </li>
                <li class="nav-bar__item">
                    <a href="./menu.html" class="nav-bar__link">Menu</a>
                </li>
                <li class="nav-bar__item">
                    <a href="./foodtruck.html" class="nav-bar__link">Locations</a>
                </li>
                <li class="nav-bar__item">
                    <a href="./cart.html" class="nav-bar__link">Your cart</a>
                </li>
            </ul>
        </nav>
    `;
}