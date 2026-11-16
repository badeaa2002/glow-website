import { User } from "../users/users.js";
const registerForm = document.querySelector("#register-form");
const messageBox = document.querySelector("#message-box");
registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;
    if (name && email && password) {
        const users = JSON.parse(localStorage.getItem("user") || "[]");
        const admin = JSON.parse(localStorage.getItem("admin"));
        const projector = JSON.parse(localStorage.getItem("projector"));
        const exists = users.some(user => user.email.toLowerCase() === email.toLowerCase());
        const isReserved = admin.email.toLowerCase() === email.toLowerCase() ||
            projector.email.toLowerCase() === email.toLowerCase();
        if (exists || isReserved) {
            messageBox.textContent = "This email already exists!";
        }
        else {
            const newUser = new User(name, email, password);
            users.push(newUser);
            localStorage.setItem("user", JSON.stringify(users));
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