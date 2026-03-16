export async function fetchProducts() {
    const response = await fetch('https://santosnr6.github.io/Data/yumyumproducts.json');
    return await response.json();
}

export async function fetchUsers() {
    const response = await fetch('https://santosnr6.github.io/Data/yumyumusers.json');
    return await response.json();
}