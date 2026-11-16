import { User } from "../users/users.js";
const loginForm = document.querySelector("#login-form");
const messageBox = document.querySelector("#message-box");
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;
    const admin = JSON.parse(localStorage.getItem("admin"));
    const projector = JSON.parse(localStorage.getItem("projector"));
    const users = JSON.parse(localStorage.getItem("user") || "[]");
    const allUsers = [admin, projector, ...users];
    const matchedUser = allUsers.find(user => user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password);
    if (matchedUser) {
        localStorage.setItem("currentUser", JSON.stringify(matchedUser));
        window.location.href = "../home.html";
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