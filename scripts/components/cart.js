export function createCartItem(product, count) {
	return `
    <li class="cart__list-item">
        <div class="cart__product-group-top">
            <h2 class="cart__product-name">${product.name}</h2>
            <span class="cart__dotted-line"></span>
            <h3 class="cart__product-price">${product.price * count} SEK</h3>
        </div>
        <div class="cart__count-adjust">
            <button class="cart__adjust-btn" data-id="${product.id}">-</button>
            <span class="cart__product-count">${count}</span>
            <button class="cart__adjust-btn" data-id="${product.id}">+</button>
        </div>
    </li>
    `;
}
