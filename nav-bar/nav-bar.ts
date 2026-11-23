
import   "../users/users.js";
import * as Permissions from "../permissions/permissions.js";

const loginButton = document.querySelector("#login") as HTMLButtonElement;
const adminLink = document.querySelector("#admin-link") as HTMLLIElement;
const homeLink = document.querySelector("#home-link") as HTMLLIElement;


if (Permissions.isLoggedIn()) {
    loginButton.textContent = "Logout";
}

// Admin link
if (adminLink && Permissions.canAccessAdminPage()) {
    adminLink.hidden = false;
}

// Home link
if (homeLink && !Permissions.canAccessHome()) {
    homeLink.hidden = true;
}

loginButton.addEventListener("click", () => {

    if (Permissions.isLoggedIn()) {
        localStorage.removeItem("currentUser");
        window.location.href = "../home/home.html";

    } else {
        window.location.href = "../login/login.html";
    }
});

