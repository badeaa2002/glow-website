import { Role } from "../user_model/user_model.js";
import { checkRole } from "../check_role/check_role.js";
import "../users/users.js";
const loginButton = document.querySelector("#login");
const adminLink = document.querySelector("#admin-link");
const homeLink = document.querySelector("#home-link");
if (localStorage.getItem("currentUser")) {
    loginButton.textContent = "Logout";
    if (checkRole(Role.Admin)) {
        adminLink.hidden = false;
    }
    if (checkRole(Role.manager)) {
        adminLink.hidden = false;
        homeLink.hidden = true;
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