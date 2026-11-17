import { products } from "../data/product.js";
import { Role, User } from "../users/users.js";
const skinContainer = document.querySelector("#skin-products");
const makeupContainer = document.querySelector("#makeup-products");
const hairContainer = document.querySelector("#hair-products");
function displayProduct(product, container) {
    const productItem = document.createElement("div");
    productItem.innerHTML = `
        <img src="../${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <span>$${product.price}</span>
         <button class="add-to-cart">Add to Cart</button>
    `;
    container.appendChild(productItem);
}
products.forEach((product) => {
    if (product.category === "skin" && skinContainer) {
        displayProduct(product, skinContainer);
    }
    else if (product.category === "makeup" && makeupContainer) {
        displayProduct(product, makeupContainer);
    }
    else if (product.category === "hair" && hairContainer) {
        displayProduct(product, hairContainer);
    }
});
const loginButton = document.querySelector("#login");
const adminLink = document.querySelector("#admin-link");
const currentUserData = localStorage.getItem("currentUser");
if (currentUserData) {
    const currentUser = JSON.parse(currentUserData);
    loginButton.textContent = "Logout";
    if (currentUser.role === Role.Admin) {
        adminLink.hidden = false;
    }
}
loginButton.addEventListener("click", () => {
    if (loginButton.textContent === "Logout") {
        localStorage.removeItem("currentUser");
        window.location.reload();
    }
    else {
        window.location.href = "../login/login.html";
    }
});
//# sourceMappingURL=categories.js.map