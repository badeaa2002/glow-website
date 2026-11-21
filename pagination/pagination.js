export function setupPagination(displayedProducts, productsContainer, pageNumbers, nextBtn, prevBtn, productsPerPage, canDelete = false, onDelete) {
    let currentPage = 0;
    let selectedProductId = null;
    const deleteModal = document.getElementById("delete-modal");
    const confirmDeleteBtn = document.getElementById("confirm-delete");
    const cancelDeleteBtn = document.getElementById("cancel-delete");
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
                    selectedProductId = product.id;
                    deleteModal.hidden = false;
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
        nextBtn.disabled = currentPage >= totalPages - 1;
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
    // Cancel Delete
    cancelDeleteBtn.addEventListener("click", () => {
        deleteModal.hidden = true;
        selectedProductId = null;
    });
    // Confirm Delete
    confirmDeleteBtn.addEventListener("click", () => {
        if (selectedProductId !== null) {
            onDelete?.(selectedProductId);
        }
        deleteModal.hidden = true;
        selectedProductId = null;
    });
    displayProducts();
}
//# sourceMappingURL=pagination.js.map