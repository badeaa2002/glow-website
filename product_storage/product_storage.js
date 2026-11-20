import { products } from "../data/product.js";
export function getProducts() {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts !== null) {
        return JSON.parse(storedProducts);
    }
    localStorage.setItem("products", JSON.stringify(products));
    return products;
}
export function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}
//# sourceMappingURL=product_storage.js.map