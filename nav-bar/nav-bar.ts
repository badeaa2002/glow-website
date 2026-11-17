import { Role, User } from "../users/users.js";

const loginButton = document.querySelector("#login") as HTMLButtonElement;
const adminLink = document.querySelector("#admin-link") as HTMLLIElement;

const currentUserData = localStorage.getItem("currentUser");

if (currentUserData) {
    const currentUser: User = JSON.parse(currentUserData);

    loginButton.textContent = "Logout";

    if (currentUser.role === Role.Admin||Role.manager) {
        adminLink.hidden = false;
    }
}

loginButton.addEventListener("click", () => {
    if (loginButton.textContent === "Logout") {
        localStorage.removeItem("currentUser");
        window.location.href = "./home.html";
    } else {
        window.location.href = "./login/login.html";
    }
});

