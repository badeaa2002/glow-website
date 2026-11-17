import { User, Role } from "../user_model/user_model.js";
import "../users/users.js";
const registerForm = document.querySelector("#register-form");
const messageBox = document.querySelector("#message-box");
registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;
    if (name && email && password) {
        const role = Role.User;
        const users = JSON.parse(localStorage.getItem("userlist") || "[]");
        // Check if email already exists
        const exists = users.some(user => user.email.toLowerCase() === email.toLowerCase());
        if (exists) {
            messageBox.textContent = "This email already exists!";
        }
        else {
            // Generate new ID automatically
            const newId = users.length > 0
                ? Math.max(...users.map(user => user.id)) + 1
                : 1;
            // Create new user
            const newUser = new User(newId, name, email, password, role);
            // Add user to array
            users.push(newUser);
            // Save updated array
            localStorage.setItem("userlist", JSON.stringify(users));
            messageBox.textContent = "Account created successfully!";
            registerForm.reset();
        }
        messageBox.style.display = "block";
        setTimeout(() => {
            messageBox.style.display = "none";
        }, 1000);
    }
});
//# sourceMappingURL=register.js.map