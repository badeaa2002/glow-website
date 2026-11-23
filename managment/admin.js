import * as Permissions from "../permissions/permissions.js";
import { User, Role } from "../user_model/user_model.js";
import "../nav-bar/nav-bar.js";
import { getProducts, saveProducts } from "../product_storage/product_storage.js";
// Select elements using jQuery
const usersTable = $("#users-table");
const adminSection = $("#admin");
const productForm = $("#product-form");
const successMessage = $("#success-message");
// Check permissions
if (!Permissions.canAccessAdminPage()) {
    window.location.replace("../home/home.html");
}
// Check if manager or not
if (!Permissions.canManageUsers()) {
    adminSection.hide();
}
// Add product
let products = getProducts();
productForm.on("submit", (e) => {
    e.preventDefault();
    const newProduct = {
        id: Math.max(...products.map(product => product.id)) + 1,
        name: $("#product-name").val(),
        description: $("#product-description").val(),
        price: Number($("#product-price").val()),
        image: `/images/${$("#product-image").val()}`,
        category: $("#product-category").val()
    };
    products.push(newProduct);
    saveProducts(products);
    // Reset form
    productForm.trigger("reset");
    // Show success message with animation
    successMessage.fadeIn(200);
    setTimeout(() => {
        successMessage.fadeOut(700);
    }, 1000);
});
// Get users
const users = JSON.parse(localStorage.getItem("userlist") || "[]");
// Display Users
function displayUsers() {
    usersTable.empty();
    users.forEach((user, index) => {
        const row = $(`
            <tr>
                <td>${user.email}</td>
                <td>${Role[user.role]}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <select class="role-select" hidden>
                        <option value="2">User</option>
                        <option value="3">Manager</option>
                    </select>
                    <button class="save-btn" hidden>Save</button>
                </td>
            </tr>
        `);
        usersTable.append(row);
        const editButton = row.find(".edit-btn");
        const roleSelect = row.find(".role-select");
        const saveButton = row.find(".save-btn");
        roleSelect.val(String(user.role));
        // Edit Role
        editButton.on("click", () => {
            roleSelect.show();
            saveButton.show();
            editButton.hide();
        });
        // Save Role
        saveButton.on("click", () => {
            const selectedUser = users[index];
            if (selectedUser) {
                selectedUser.role = Number(roleSelect.val());
                localStorage.setItem("userlist", JSON.stringify(users));
                displayUsers();
            }
        });
    });
}
displayUsers();
//# sourceMappingURL=admin.js.map