import type { Product } from "../product_model/product_model.js";
import { displayProducts } from "../display_product/display_product.js";

export function setupPagination(
    displayedProducts: Product[],
    productsContainer: Element,
    pageNumbers: Element,
    nextBtn: HTMLButtonElement,
    prevBtn: HTMLButtonElement,
    productsPerPage: number,
    canDelete: boolean = false,
    onDelete?: (id: number) => void
    ): void {

    let currentPage = 0;

    const totalPages = Math.ceil(
        displayedProducts.length / productsPerPage
    );

    // Display current page
    function showCurrentPage(): void {

        const startIndex = currentPage * productsPerPage;

        const productsToDisplay = displayedProducts.slice(
            startIndex,
            startIndex + productsPerPage
        );

        displayProducts(
            productsToDisplay,
            productsContainer,
            canDelete,
            onDelete
        );
        createPageNumbers();
        updatePagination();
    }

    // Create page numbers
    function createPageNumbers(): void {

        pageNumbers.innerHTML = "";

        for (let i = 0; i < totalPages; i++) {

            const page = document.createElement("span");

            page.textContent = String(i + 1);
            page.classList.add("page-link");

            if (currentPage === i) {
                page.classList.add("active");
            }

            page.addEventListener("click", () => {
                currentPage = i;
                showCurrentPage();
            });

            pageNumbers.appendChild(page);
        }
    }

    // Update buttons
    function updatePagination(): void {

        prevBtn.disabled = currentPage === 0;

        nextBtn.disabled = currentPage >= totalPages - 1;
    }

    // Next
    nextBtn.addEventListener("click", () => {

        if (currentPage < totalPages - 1) {
            currentPage++;
            showCurrentPage();
        }

    });

    // Previous
    prevBtn.addEventListener("click", () => {

        if (currentPage > 0) {
            currentPage--;
            showCurrentPage();
        }

    });

    showCurrentPage();
}