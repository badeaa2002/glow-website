import { getProducts ,saveProducts } from "../product_storage/product_storage.js";
import { setupPagination} from "../pagination/pagination.js";
import { Role } from "../user_model/user_model.js";
import { checkRole } from "../check_role/check_role.js";
import "../users/users.js";
import "../nav-bar/nav-bar.js";


function deleteProduct(id: number): void {
    const products = getProducts();
    const updatedProducts = products.filter(
        product => product.id !== id
    );
    saveProducts(updatedProducts);
    window.location.reload();
}

const canDelete =
    checkRole(Role.Admin) || checkRole(Role.manager);

const products = getProducts();

const categories = [
    { name: "skin", id: "skin-products", paginationId: "skin-pagination" },
    { name: "makeup", id: "makeup-products", paginationId: "makeup-pagination" },
    { name: "hair", id: "hair-products", paginationId: "hair-pagination" }
];

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
        deleteProduct

    );

}); 

