export function createCartoverlay() {
	return `
    <div class="cart-overlay">
        <section class="cart-overlay__section">
            <button class="cart-overlay__btn" id="cartLoginBtn">Logga in</button>
            <span class="cart-overlay__text">Eller</span>
            <button class="cart-overlay__btn" id="cartContinueBtn">Fortsätt som gäst</button>
        </section>
    </div>
    `;
}
