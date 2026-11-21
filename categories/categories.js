import { getProducts, saveProducts } from "../product_storage/product_storage.js";
import { setupPagination } from "../pagination/pagination.js";
import { Role } from "../user_model/user_model.js";
import { checkRole } from "../check_role/check_role.js";
import "../users/users.js";
import "../nav-bar/nav-bar.js";
// Check permissions
const canDelete = checkRole(Role.Admin) || checkRole(Role.manager);
// Delete modal elements
const deleteModal = document.getElementById("delete-modal");
const confirmDeleteBtn = document.getElementById("confirm-delete");
const cancelDeleteBtn = document.getElementById("cancel-delete");
let selectedProductId = null;
// Delete product
function deleteProduct(id) {
    const products = getProducts();
    const updatedProducts = products.filter(product => product.id !== id);
    saveProducts(updatedProducts);
    window.location.reload();
}
// Open delete modal
function openDeleteModal(id) {
    selectedProductId = id;
    deleteModal.hidden = false;
}
// Cancel delete
cancelDeleteBtn.addEventListener("click", () => {
    deleteModal.hidden = true;
    selectedProductId = null;
});
// Confirm delete
confirmDeleteBtn.addEventListener("click", () => {
    if (selectedProductId !== null) {
        deleteProduct(selectedProductId);
    }
    deleteModal.hidden = true;
    selectedProductId = null;
});
// Get products
const products = getProducts();
// Categories
const categories = [
    { name: "skin", id: "skin-products", paginationId: "skin-pagination" },
    { name: "makeup", id: "makeup-products", paginationId: "makeup-pagination"
    },
    { name: "hair", id: "hair-products", paginationId: "hair-pagination"
    }
];
// Display categories
categories.forEach((category) => {
    const container = document.querySelector(`#${category.id}`);
    const pagination = document.querySelector(`#${category.paginationId}`);
    if (!container || !pagination)
        return;
    const nextBtn = pagination.querySelector(".next-btn");
    const prevBtn = pagination.querySelector(".prev-btn");
    const pageNumbers = pagination.querySelector(".page-numbers");
    if (!nextBtn || !prevBtn || !pageNumbers)
        return;
    const categoryProducts = products.filter(product => product.category === category.name);
    setupPagination(categoryProducts, container, pageNumbers, nextBtn, prevBtn, 3, canDelete, openDeleteModal);
});
//# sourceMappingURL=categories.js.map