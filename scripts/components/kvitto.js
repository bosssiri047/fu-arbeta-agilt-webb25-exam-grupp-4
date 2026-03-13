export function createKvittoItem(product) {
	return `
    <li class="receipt__list-item">
        <div class="receipt__product-group">
            <h2 class="receipt__product-name">${product.name}</h2>
            <span class="receipt__dotted-line"></span>
            <h3 class="receipt__product-price">${product.price * product.count} SEK</h3>
        </div>
    </li>
    `;
}