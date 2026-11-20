export function setupPagination(displayedProducts, productsContainer, pageNumbers, nextBtn, prevBtn, productsPerPage, canDelete = false, onDelete) {
    let currentPage = 0;
    const totalPages = Math.ceil(displayedProducts.length / productsPerPage);
    function displayProducts() {
        productsContainer.innerHTML = "";
        const startIndex = currentPage * productsPerPage;
        const productsToDisplay = displayedProducts.slice(startIndex, startIndex + productsPerPage);
        productsToDisplay.forEach((product) => {
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
        createPageNumbers();
        updatePagination();
    }
    function createPageNumbers() {
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
                displayProducts();
            });
            pageNumbers.appendChild(page);
        }
    }
    function updatePagination() {
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
    }
    nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            displayProducts();
        }
    });
    prevBtn.addEventListener("click", () => {
        if (currentPage > 0) {
            currentPage--;
            displayProducts();
        }
    });
    displayProducts();
}
//# sourceMappingURL=pagination.js.map