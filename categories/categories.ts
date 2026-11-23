import { getProducts,saveProducts} from "../product_storage/product_storage.js";
import { setupPagination } from "../pagination/pagination.js";
import * as Permissions from "../permissions/permissions.js";
import "../users/users.js";
import "../nav-bar/nav-bar.js";


// Check permissions
const canDelete = Permissions.canDelete();

// Delete modal element
const deleteModal = $("#delete-modal");
let selectedProductId: number | null = null;

// Delete product
function deleteProduct(id: number): void {
    const products = getProducts();
    const updatedProducts = products.filter(
        product => product.id !== id
    );
    saveProducts(updatedProducts);
}

// Open delete modal
function openDeleteModal(id: number): void {
    selectedProductId = id;
   deleteModal.prop("hidden", false);
}

// Cancel delete
$("#cancel-delete").on("click", () => {
    deleteModal.hide();
    selectedProductId = null;
});

// Confirm delete
$("#confirm-delete").on("click", () => {
    if (selectedProductId !== null) {
        deleteProduct(selectedProductId);
        deleteModal.hide();
        selectedProductId = null;
        window.location.reload();
    }
});

// Get products
const products = getProducts();

// Categories
const categories = [
    { name: "skin",id: "skin-products",paginationId: "skin-pagination" },
    { name: "makeup",id: "makeup-products",paginationId: "makeup-pagination"
    },
    { name: "hair",id: "hair-products",paginationId: "hair-pagination"
    }
];

// Display categories
categories.forEach((category) => {
    const container = document.querySelector(`#${category.id}`);
    const pagination = document.querySelector(`#${category.paginationId}`);
    if (!container || !pagination) return;
    const nextBtn = pagination.querySelector(".next-btn") as HTMLButtonElement;
    const prevBtn = pagination.querySelector(".prev-btn") as HTMLButtonElement;
    const pageNumbers = pagination.querySelector(".page-numbers");
    if (!nextBtn || !prevBtn || !pageNumbers) return;
    const categoryProducts = products.filter(
        product => product.category === category.name
    );

    setupPagination(
        categoryProducts,
        container,
        pageNumbers,
        nextBtn,
        prevBtn,
        3,
        canDelete,
        openDeleteModal
    );
});