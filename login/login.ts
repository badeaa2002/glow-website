
import { User } from "../users/users.js";

const loginForm = document.querySelector("#login-form") as HTMLFormElement;
const messageBox = document.querySelector("#message-box") as HTMLDivElement;

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = (document.querySelector("#email") as HTMLInputElement).value.trim();
    const password = (document.querySelector("#password") as HTMLInputElement).value;

    const admin: User = JSON.parse(localStorage.getItem("admin") as string);
    const projector: User = JSON.parse(localStorage.getItem("projector") as string);

    const users: User[] = JSON.parse(localStorage.getItem("user") || "[]");

    const allUsers = [admin, projector, ...users];

    const matchedUser = allUsers.find(
        user =>
            user.email.toLowerCase() === email.toLowerCase() &&
            user.password === password
    );

    if (matchedUser) {
        localStorage.setItem("currentUser", JSON.stringify(matchedUser));

        window.location.href = "../home.html";
    } else {
        messageBox.textContent = "Invalid email or password!";
        messageBox.style.display = "block";

        setTimeout(() => {
            messageBox.style.display = "none";
        }, 1000);
    }
});
