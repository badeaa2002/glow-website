import { User, Role } from "../user_model/user_model.js";
import "../users/users.js";
const loginButton = document.querySelector("#login");
const adminLink = document.querySelector("#admin-link");
const currentUserData = localStorage.getItem("currentUser");
if (currentUserData) {
    const currentUser = JSON.parse(currentUserData);
    loginButton.textContent = "Logout";
    if (currentUser.role === Role.Admin ||
        currentUser.role === Role.manager) {
        adminLink.hidden = false;
    }
}
loginButton.addEventListener("click", () => {
    if (loginButton.textContent === "Logout") {
        localStorage.removeItem("currentUser");
        window.location.href = "../home/home.html";
    }
    else {
        window.location.href = "../login/login.html";
    }
});
//# sourceMappingURL=nav-bar.js.map