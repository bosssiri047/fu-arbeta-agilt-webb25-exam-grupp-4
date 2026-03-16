export function createHistoryItem(orders) {
	return `
    <li class="history__list-item">
        <h3 class="history__item-id">#${orders.id}</h3>
        <h3 class="history__item-date">${orders.date}</h3>
    </li>
    `;
}