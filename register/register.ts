
import { User } from "../users/users.js";

const registerForm = document.querySelector("#register-form") as HTMLFormElement;
const messageBox = document.querySelector("#message-box") as HTMLDivElement;

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
const name = (document.querySelector("#name") as HTMLInputElement).value.trim();

const email = (document.querySelector("#email") as HTMLInputElement).value.trim();

const password = (document.querySelector("#password") as HTMLInputElement).value;

    if (name && email && password) {

        const users: User[] = JSON.parse(
            localStorage.getItem("user") || "[]"
        );

     const admin: User = JSON.parse(localStorage.getItem("admin") as string);
     const projector: User = JSON.parse(localStorage.getItem("projector") as string);

        const exists = users.some(
            user => user.email.toLowerCase() === email.toLowerCase()
        );

        const isReserved =
            admin.email.toLowerCase() === email.toLowerCase() ||
            projector.email.toLowerCase() === email.toLowerCase();

        if (exists || isReserved) {
            messageBox.textContent = "This email already exists!";
        } else {
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
