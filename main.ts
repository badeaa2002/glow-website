
import { products ,type Product } from "./data/product.js";
import "./users/users.js"
import "./nav-bar/nav-bar.js"

const productsContainer = document.querySelector(".products-container");
const nextBtn = document.querySelector(".next-btn") as HTMLButtonElement;
const prevBtn = document.querySelector(".prev-btn") as HTMLButtonElement;
const pageNumbers = document.querySelector(".page-numbers");

const productsPerPage: number = 4;
let currentPage: number = 0;
let displayedProducts: Product[] = [];

const totalPages: number = Math.ceil(
    products.length / productsPerPage
);

// Shuffle products randomly
function shuffleProducts(): Product[] {
    return [...products].sort(() => Math.random() - 0.5);
}

let shuffledProducts: Product[] = shuffleProducts();

// Display products
function displayProducts(): void {
    if (!productsContainer) return;

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
function createPageNumbers(): void {
    if (!pageNumbers) return;

    pageNumbers.innerHTML = "";

    for (let i = 0; i < totalPages; i++) {
        const page= document.createElement("span");
        page.textContent = String(i + 1);
        page.classList.add("page-link");
        if (currentPage === i) {
            page.classList.add("active");
        }
        pageNumbers.appendChild(page);
    }
}

// Update pagination buttons
function updatePagination(): void {
    if (!nextBtn || !prevBtn) return;

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
