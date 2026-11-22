
import type { Product } from "../product_model/product_model.js";
import { getProducts } from "../product_storage/product_storage.js";
import { displayProducts } from "../display_product/display_product.js";

const productsContainer=document.querySelector(".products-container")as HTMLElement||null;
const nextBtn=document.querySelector(".next-btn") as HTMLButtonElement;
const prevtBtn=document.querySelector(".prev-btn") as HTMLButtonElement;
const pageNum=document.querySelector(".page-numbers");

const products =getProducts();
let displayedProducts:Product[]=[];

let currentPage=1;
const productsPerPage=3;

function paginate(
   totalitems: number,
   page: number,
   pagesize: number
): void {
   const totalPages = Math.ceil(totalitems / pagesize);
   currentPage = page;
   const start = (currentPage - 1) * pagesize;
   const end = start + pagesize;
   displayedProducts = products.slice(start, end);
   if(!productsContainer){
    return
   }
   displayProducts(
    displayedProducts,
    productsContainer
   )
   if (pageNum) {
       pageNum.innerHTML = "";
       const pages = Array.from(
           { length: totalPages },
           (_, i) => i + 1
       );
       pages.forEach((page) => {
           const span = document.createElement("span");
           span.textContent = String(page);
           pageNum.appendChild(span);
        });
        }
        prevtBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
        };
            
        // Current page variable
        let currentpage = 1;
        // Next button
        nextBtn?.addEventListener("click", () => {
        currentpage++;
        paginate(
            products.length,
            currentpage,
            productsPerPage
        );
        });
        // Previous button
        prevtBtn?.addEventListener("click", () => {
        currentpage--;
        paginate(
            products.length,
            currentpage,
            productsPerPage
        );
        });
        // Initial display
        paginate(
            products.length,
            currentPage,
            productsPerPage
        );



        



