export async function fetchProducts() {
    const response = await fetch('https://santosnr6.github.io/Data/yumyumproducts.json');
    return await response.json();
}