export function orderRecipt(order) {
  //Skapa fram kvitto (strings)
  let reciptItemsList = "";

  // memo ändrat item till procuct -loopa igeno malla produkter i ordern
  for (const item of order.products) {
    // bygg i hop kvittot och använd Jonathans
    const radTotalt = item.price * item.count;

    // Bygg HTML för en produktrad och lägg i lådan
    reciptItemsList += `
    <li class="kvitto-item">
    <section class="kvitto-item-row">
    <p class="kvitto-item-name"><strong>${item.name}</strong></p>
    <p class="kvitto-item-price">${radTotalt} SEK</p>
    </section>
    <p class="kvitto-item-quantity">${item.count} Stycken</p>
    </li>
    `;
  }

  // Returnera hela kvittot med all HTML
  return `
    <main class="kvitto-wrapper">
      <section class="kvitto">
        <figure class="mainherologo">
          <img class="kvittohero" src="res/logo.png" alt="mainhero-img" />
          <p class="kvittoid">#${order.id}</p>
        </figure>
      </section>
      
      <section class="kvitto-wrapper-info">
        <h2 class="kvitto-title">KVITTO</h2>
        <ul class="kvitto-list">
          ${reciptItemsList} 
        </ul>
        
        <section>
          <p class="kvitto-totalsumma"><strong>TOTALT</strong></p>
          <p class="kvitto-moms">inkl 20% moms</p>
          <p class="kvitto-total-price">${order.totalPrice} SEK</p>
        </section>
      </section>

      <section class="kvittoorder">
        <button class="button makeorderBtn">
          Gör en ny Beställning
        </button>
      </section>
    </main>
  `;
}
