import type { Product } from "../product_model/product_model.js";

export function displayProducts(
    products: Product[],
    productsContainer: Element,
    canDelete: boolean = false,
    onDelete?: (id: number) => void
    ): void {
    productsContainer.innerHTML = "";
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="../${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span>$${product.price}</span>
        `;
        if (canDelete) {
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", () => {
            onDelete?.(product.id);
            });
            productCard.appendChild(deleteBtn);
        }
        productsContainer.appendChild(productCard);
    });
}