import { User, Role } from "../user_model/user_model.js";
let users = JSON.parse(localStorage.getItem("userlist") || "[]");
if (!localStorage.getItem("userlist")) {
    const admin = new User(1, "Admin", "admin@glow.com", "admin123", Role.Admin);
    const manager = new User(2, "manager", "projector@glow.com", "projector123", Role.manager);
    users.push(admin, manager);
    localStorage.setItem(("userlist"), JSON.stringify(users));
}
//# sourceMappingURL=users.js.map