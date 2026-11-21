import { User, Role } from "../user_model/user_model.js";
import { checkRole } from "../check_role/check_role.js";
import "../users/users.js";
const loginForm = document.querySelector("#login-form");
const messageBox = document.querySelector("#message-box");
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;
    const users = JSON.parse(localStorage.getItem("userlist") || "[]");
    const matchedUser = users.find(user => user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password);
    if (matchedUser) {
        localStorage.setItem("currentUser", JSON.stringify(matchedUser));
        if (checkRole(Role.manager)) {
            window.location.href = "../categories/categories.html";
        }
        else {
            window.location.href = "../home/home.html";
        }
    }
    else {
        messageBox.textContent = "Invalid email or password!";
        messageBox.style.display = "block";
        setTimeout(() => {
            messageBox.style.display = "none";
        }, 1000);
    }
});
//# sourceMappingURL=login.js.map