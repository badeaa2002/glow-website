
import {User , Role}from "../user_model/user_model.js";
import "../users/users.js";
import "../nav-bar/nav-bar.js";

import type { Product } from "../product_model/product_model.js";
import { getProducts, saveProducts } from "../product_storage/product_storage.js";

const usersTable = document.querySelector("#users-table") as HTMLTableSectionElement;
const adminSection =document.getElementById("admin")  as HTMLElement;
const productForm = document.getElementById("product-form") as HTMLFormElement;
const productName = document.getElementById("product-name") as HTMLInputElement;
const productDescription = document.getElementById("product-description") as HTMLTextAreaElement;
const productPrice = document.getElementById("product-price") as HTMLInputElement;
const productImage = document.getElementById("product-image") as HTMLInputElement;
const productCategory = document.getElementById("product-category") as HTMLSelectElement;

let products: Product[] = getProducts();
productForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const newProduct: Product = {
        id: Math.max(...products.map(product => product.id)) + 1,
        name: productName.value,
        description: productDescription.value,
        price: Number(productPrice.value),
        image: productImage.value,
        category: productCategory.value
    };

    products.push(newProduct);

    saveProducts(products);

    productForm.reset();

    alert("Product added successfully!");

});

const currentUser: User | null = JSON.parse(
   localStorage.getItem("currentUser") || "null"
);

if(currentUser){
    if(currentUser.role===Role.manager){
        adminSection.hidden=true;
    }
}


const users: User[] = JSON.parse(
    localStorage.getItem("userlist") || "[]"
);
// Display Users
function displayUsers() {
    usersTable.innerHTML = "";
    users.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.email}</td>
            <td>${Role[user.role]}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <select class="role-select" hidden>
                    <option value="2">User</option>
                    <option value="3">manager</option>
                </select>
                <button class="save-btn" hidden>Save</button>
            </td>
        `;
        usersTable.appendChild(row);
        const editButton = row.querySelector(".edit-btn") as HTMLButtonElement;
        const roleSelect = row.querySelector(".role-select") as HTMLSelectElement;
        const saveButton = row.querySelector(".save-btn") as HTMLButtonElement;
        roleSelect.value = String(user.role);
        // Edit Role
        editButton.addEventListener("click", () => {
            roleSelect.hidden = false;
            saveButton.hidden = false;
            editButton.hidden = true;
        });
     // Save Role
     saveButton.addEventListener("click", () => {
    const selectedUser = users[index];
    if (selectedUser) {
        selectedUser.role = Number(roleSelect.value) as Role;
        localStorage.setItem("user", JSON.stringify(user));
        displayUsers();
    }
});
    });
}

displayUsers();







