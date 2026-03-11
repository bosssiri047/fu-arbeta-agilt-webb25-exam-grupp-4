export function orderRecipt(order) {
  //Skapa fram kvitto (strings)
  let reciptItemsList = "";

  // memo ändrat item till procuct
  for (const item of order.product);
  {
    // bygg i hop kvittot och använd Jonathans
    const radTotalt = item.price * item.count;

    // bygg ihop kvitto

    reciptItemsList += `
    <li class="kvitto-item>
    <section class="kvitto-item-row">
    <p class="kvitto-item-name"><strong>${item.name}</strong></p>
    <p class="kvitto-item-price">${radTotalt} SEK</p>
    </section>
    <p class="kvitto-item-quantity">${item.count} Stycken</p>
    </li>
    `;
  }

  // Returnera hela kvittot
  return `<main class="kvitto-wrapper" id="kvittoWrapper">
      <section class="kvitto">
        <figure class="mainherologo" id="mainLogo">
          <img class="kvittohero" src="res/logo.png" alt="mainhero-img" />
          <p class="kvittoid" id="kvittoId"#${order.id}</p>
        </figure>
      </section>
      <!-- Hero End -->
      <!-- Kvitto Start -->
      <section class="kvitto-wrapper-info">
        <h2 class="kvitto-title" id="kvittoTitle">KVITTO</h2>
        <ul class="kvitto-list" id="kvittoList">
          <!-- här fyller JS i alla produkter -->
        </ul>
        <!-- kvitto footer start -->
        <section>
          <p class="kvitto-totalsumma" id="kvittoTotalSumma">Total summa</p>
          <p class="kvitto-moms" id="kvittoMoms">ink 20%moms</p>
          <p class="kvitto-total-price" id="kvittoTotalPrice">${order.totalPrice} SEK</p>
        </section>
        <!-- kvitto footer end -->
      </section>

      <section class="kvittoorder" id="kvittoOrder">
        <button class="button makeorderBtn" id="makeOrderBtn">
          Gör en ny Beställning
        </button>
      </section>
    </main>`;
}
