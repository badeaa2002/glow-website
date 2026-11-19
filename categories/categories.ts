import { products} from "../data/product.js";
import { setupPagination } from "../pagination/pagination.js";
import "../users/users.js";
import "../nav-bar/nav-bar.js";

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
        3

    );

}); 


