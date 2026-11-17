
import { User,Role } from "../users/users.js";


const registerForm = document.querySelector("#register-form") as HTMLFormElement;
const messageBox = document.querySelector("#message-box") as HTMLDivElement;

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = (document.querySelector("#name") as HTMLInputElement).value.trim();
    const email = (document.querySelector("#email") as HTMLInputElement).value.trim();
    const password = (document.querySelector("#password") as HTMLInputElement).value;
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
           messageBox.textContent = "This email already exists!";
       }
       else {
           // Generate new ID automatically
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
           messageBox.textContent = "Account created successfully!";
           registerForm.reset();
       }
       messageBox.style.display = "block";
       setTimeout(() => {
           messageBox.style.display = "none";
       }, 1000);
   }
});
