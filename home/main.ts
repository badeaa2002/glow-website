
import { products ,type Product } from "../data/product.js";
import "../users/users.js"
import "../nav-bar/nav-bar.js"
import { setupPagination } from "../pagination/pagination.js";


const productsContainer = document.querySelector(".products-container");
const nextBtn = document.querySelector(".next-btn") as HTMLButtonElement;
const prevBtn = document.querySelector(".prev-btn") as HTMLButtonElement;
const pageNumbers = document.querySelector(".page-numbers");

if (productsContainer && pageNumbers && nextBtn && prevBtn){
    setupPagination(
        products,
        productsContainer,
        pageNumbers,
        nextBtn,
        prevBtn,
        4
    );
 };


