import "../users/users.js";
import * as Permissions from "../permissions/permissions.js";
const loginButton = document.querySelector("#login");
const adminLink = document.querySelector("#admin-link");
const homeLink = document.querySelector("#home-link");
if (Permissions.isLoggedIn()) {
    loginButton.textContent = "Logout";
}
if (Permissions.canAccessAdminPage()) {
    adminLink.hidden = false;
}
if (!Permissions.canAccessHome()) {
    homeLink.hidden = true;
}
loginButton.addEventListener("click", () => {
    if (Permissions.isLoggedIn()) {
        localStorage.removeItem("currentUser");
        window.location.href = "../home/home.html";
    }
    else {
        window.location.href = "../login/login.html";
    }
});
//# sourceMappingURL=nav-bar.js.map