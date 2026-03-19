export function createProduct(product) {
  if (product.ingredients) {
    //Ingredients string
    let productIngredients = "";

    //Put ingredients from array into a string
    product.ingredients.forEach((ingredient) => {
      productIngredients += `${ingredient}, `;
    });

    //Trimming out the extra ", "
    productIngredients = productIngredients.slice(0, -2);

    return `
        <li class="menu__list-item">
            <button class="menu__card" id="${product.id}">
                <div class="menu__card-info-group">
                    <h2 class="menu__card-name">
                        ${product.name}
                    </h2>
                    <h3 class="menu__card-price">
                        ${product.price} SEK
                    </h3>
                </div>
                <h4 class="menu__card-ingredients">
                    ${productIngredients}
                </h4>
            </button>
        </li>
        `;
  } else {
    return `
        <li class="menu__list-item">
            <button class="menu__card" id="${product.id}">
                <div class="menu__card-info-group">
                    <h2 class="menu__card-name">
                        ${product.name}
                    </h2>
                    <h3 class="menu__card-price">
                        ${product.price} SEK
                    </h3>
                </div>
            </button>
        </li>
        `;
  }
}
