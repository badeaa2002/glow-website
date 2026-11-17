
import { User, Role } from "../users/users.js";
const usersTable = document.querySelector("#users-table") as HTMLTableSectionElement;
const adminSection =document.getElementById("admin")  as HTMLElement;

const currentUser: User | null = JSON.parse(
   localStorage.getItem("currentUser") || "null"
);

if(currentUser){
    if(currentUser.role===Role.manager){
        adminSection.hidden=true;
    }
}


const users: User[] = JSON.parse(
    localStorage.getItem("userlist") || "[]"
);
// Display Users
function displayUsers() {
    usersTable.innerHTML = "";
    users.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.email}</td>
            <td>${Role[user.role]}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <select class="role-select" hidden>
                    <option value="2">User</option>
                    <option value="3">manager</option>
                </select>
                <button class="save-btn" hidden>Save</button>
            </td>
        `;
        usersTable.appendChild(row);
        const editButton = row.querySelector(".edit-btn") as HTMLButtonElement;
        const roleSelect = row.querySelector(".role-select") as HTMLSelectElement;
        const saveButton = row.querySelector(".save-btn") as HTMLButtonElement;
        roleSelect.value = String(user.role);
        // Edit Role
        editButton.addEventListener("click", () => {
            roleSelect.hidden = false;
            saveButton.hidden = false;
            editButton.hidden = true;
        });
     // Save Role
     saveButton.addEventListener("click", () => {
    const selectedUser = users[index];
    if (selectedUser) {
        selectedUser.role = Number(roleSelect.value) as Role;
        localStorage.setItem("user", JSON.stringify(user));
        displayUsers();
    }
});
    });
}

displayUsers();






// nav bar 
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
        window.location.reload();
    } else {
        window.location.href = "../login/login.html";
    }
});

