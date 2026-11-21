import { User, Role } from "../user_model/user_model.js";
import { checkRole } from "../check_role/check_role.js";
import "../users/users.js";
import "../nav-bar/nav-bar.js";
import { getProducts, saveProducts } from "../product_storage/product_storage.js";
const usersTable = document.querySelector("#users-table");
const adminSection = document.getElementById("admin");
const productForm = document.getElementById("product-form");
const productName = document.getElementById("product-name");
const productDescription = document.getElementById("product-description");
const productPrice = document.getElementById("product-price");
const productImage = document.getElementById("product-image");
const productCategory = document.getElementById("product-category");
const successMessage = document.getElementById("success-message");
let products = getProducts();
productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newProduct = {
        id: Math.max(...products.map(product => product.id)) + 1,
        name: productName.value,
        description: productDescription.value,
        price: Number(productPrice.value),
        image: `/images/${productImage.value}`,
        category: productCategory.value
    };
    products.push(newProduct);
    saveProducts(products);
    productForm.reset();
    successMessage.style.display = "flex";
    setTimeout(() => {
        successMessage.style.display = "none";
    }, 3000);
});
if (checkRole(Role.manager)) {
    adminSection.hidden = true;
}
const users = JSON.parse(localStorage.getItem("userlist") || "[]");
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
        const editButton = row.querySelector(".edit-btn");
        const roleSelect = row.querySelector(".role-select");
        const saveButton = row.querySelector(".save-btn");
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
                selectedUser.role = Number(roleSelect.value);
                localStorage.setItem("userlist", JSON.stringify(users));
                displayUsers();
            }
        });
    });
}
displayUsers();
//# sourceMappingURL=admin.js.map