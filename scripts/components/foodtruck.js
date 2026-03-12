const foodTruck1 =
	"pb=!1m18!1m12!1m3!1d1051.5411529437317!2d13.580398287494425!3d59.406062961408765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465cb12dfeb2f6e3%3A0x4d3afe475254bf1e!2sKarlstad%20University!5e1!3m2!1sen!2sse!4v1773309312734!5m2!1sen!2sse";
const foodTruck2 =
	"pb=!1m18!1m12!1m3!1d2501.0623231270115!2d13.389835477344239!3d59.372857007535636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465cb3842deefb41%3A0x200fa28813d37fa2!2sSkutbergsv%C3%A4gen%202%2C%20653%2046%20Karlstad!5e1!3m2!1sen!2sse!4v1773311322497!5m2!1sen!2sse";
const foodTruck3 =
	"pb=!1m18!1m12!1m3!1d2501.16890102477!2d13.482727277344122!3d59.37141150765135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465cb23278f88701%3A0xf00c95ad3209b799!2sTreffenbergsv%C3%A4gen%2C%20652%2029%20Karlstad!5e1!3m2!1sen!2sse!4v1773311380479!5m2!1sen!2sse";
const foodTruck4 =
	"pb=!1m18!1m12!1m3!1d2500.459742821945!2d13.502498577344657!3d59.38102930688117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465cb3d6f9399c91%3A0x1df649b66f63e3b7!2sKungsgatan%2C%20Karlstad!5e1!3m2!1sen!2sse!4v1773311420360!5m2!1sen!2sse";

export function createMapOverlay(id) {
	let embedUrl;
	if (id === 1) {
		embedUrl = foodTruck1;
	} else if (id === 2) {
		embedUrl = foodTruck2;
	} else if (id === 3) {
		embedUrl = foodTruck3;
	} else if (id === 4) {
		embedUrl = foodTruck4;
	}

	return `
    <button class="map-overlay__close-btn" id="mapCloseBtn">X</button>
    <iframe
        class="map-overlay__embed"
        id="mapOverlayEmbed"
        src="https://www.google.com/maps/embed?${embedUrl}"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
    `;
}
