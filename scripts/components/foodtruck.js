export function loadFoodtruckEventListeners() {
	document
		.querySelector("#foodTruckContainer")
		.addEventListener("click", (event) => {
			const click = event.target;

			if (click.closest("#foodTruck1")) {
				console.log("foodtruck1");
			} else if (click.closest("#foodTruck2")) {
				console.log("foodtruck2");
			} else if (click.closest("#foodTruck3")) {
				console.log("foodtruck3");
			} else if (click.closest("#foodTruck4")) {
				console.log("foodtruck4");
			}
		});
}
