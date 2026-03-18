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
            <li class="menu__list-item" id="${product.id}">
		    	<article class="menu__card" >
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
		    	</article>
		    </li>
        `;
	} else {
		return `
            <li class="menu__list-item" id="${product.id}">
		    	<article class="menu__card" >
		    		<div class="menu__card-info-group">
		    			<h2 class="menu__card-name">
		    				${product.name}
		    			</h2>
                        <h3 class="menu__card-price">
                            ${product.price} SEK
                        </h3>
		    		</div>
		    	</article>
		    </li>
        `;
	}
}
