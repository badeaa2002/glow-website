import type { Product } from "../product_model/product_model.js";
import { products } from "../data/product.js";

export function getProducts(): Product[] {

    const storedProducts = localStorage.getItem("products");

    if (storedProducts !== null) {
        return JSON.parse(storedProducts);
    }

    localStorage.setItem("products", JSON.stringify(products));

    return products;
}

export function saveProducts(products: Product[]): void {

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}
