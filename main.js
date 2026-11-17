import { products } from "./data/product.js";
import "./nav-bar/nav-bar.js";
const productsContainer = document.querySelector(".products-container");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const pageNumbers = document.querySelector(".page-numbers");
const productsPerPage = 4;
let currentPage = 0;
let displayedProducts = [];
const totalPages = Math.ceil(products.length / productsPerPage);
// Shuffle products randomly
function shuffleProducts() {
    return [...products].sort(() => Math.random() - 0.5);
}
let shuffledProducts = shuffleProducts();
// Display products
function displayProducts() {
    if (!productsContainer)
        return;
    productsContainer.innerHTML = "";
    const start = currentPage * productsPerPage;
    const end = start + productsPerPage;
    displayedProducts = shuffledProducts.slice(start, end);
    displayedProducts.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span>$${product.price}</span>
        `;
        productsContainer.appendChild(productCard);
    });
    // Update page numbers and active page
    createPageNumbers();
    // Update Previous and Next buttons
    updatePagination();
}
// Create page numbers
function createPageNumbers() {
    if (!pageNumbers)
        return;
    pageNumbers.innerHTML = "";
    for (let i = 0; i < totalPages; i++) {
        const page = document.createElement("span");
        page.textContent = String(i + 1);
        page.classList.add("page-link");
        if (currentPage === i) {
            page.classList.add("active");
        }
        pageNumbers.appendChild(page);
    }
}
// Update pagination buttons
function updatePagination() {
    if (!nextBtn || !prevBtn)
        return;
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;
}
// Next button
nextBtn?.addEventListener("click", () => {
    if (currentPage < totalPages - 1) {
        currentPage++;
        displayProducts();
    }
});
// Previous button
prevBtn?.addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        displayProducts();
    }
});
// Initial display
displayProducts();
//# sourceMappingURL=main.js.map