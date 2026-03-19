export function createOrderHistory(orders) {
	return `
    <li class="history__list-item">
        <button class="history__btn" id="${orders.id}">
            <h3 class="history__item-id">#${orders.id}</h3>
            <h3 class="history__item-date">${orders.date}</h3>
        </button>
    </li>
    `;
}

export function createOrderHistoryListItem(product) {
	return `
    <li class="order__list-item">
        <div class="order__product-group">
            <h2 class="order__product-name">${product.name}</h2>
            <span class="order__dotted-line"></span>
            <h3 class="order__product-price">${product.price * product.count} SEK</h3>
        </div>
    </li>
    `;
}
