
import $ from "jquery";
import { User, Role } from "../user_model/user_model.js";
import "../users/users.js";

const registerForm = $("#register-form");
const messageBox = $("#message-box");

registerForm.on("submit", (event) => {
    event.preventDefault();
    const name = ($("#name").val() as string).trim();
    const email = ($("#email").val() as string).trim();
    const password = $("#password").val() as string;
    if (name && email && password) {
        const role: Role = Role.User;
        const users: User[] = JSON.parse(
            localStorage.getItem("userlist") || "[]"
        );
        // Check if email already exists
        const exists = users.some(
            user => user.email.toLowerCase() === email.toLowerCase()
        );
        if (exists) {
            messageBox.text("This email already exists!");
        } else {
            // Generate new ID
            const newId = users.length > 0
                ? Math.max(...users.map(user => user.id)) + 1
                : 1;
            // Create new user
            const newUser = new User(
                newId,
                name,
                email,
                password,
                role
            );

            // Add user to array
            users.push(newUser);
            // Save updated array
            localStorage.setItem("userlist", JSON.stringify(users));
            messageBox.text("Account created successfully!");
            registerForm.trigger("reset");
        }
        messageBox.show();
        setTimeout(() => {
            messageBox.hide();
        }, 1000);
    }
});
