export var Role;
(function (Role) {
    Role[Role["Admin"] = 1] = "Admin";
    Role[Role["User"] = 2] = "User";
    Role[Role["Projector"] = 3] = "Projector";
})(Role || (Role = {}));
export class User {
    name;
    email;
    password;
    role;
    constructor(name, email, password, role = Role.User) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
const admin = new User("Admin", "admin@glow.com", "admin123", Role.Admin);
const projector = new User("Projector", "projector@glow.com", "projector123", Role.Projector);
if (localStorage.getItem("admin") === null) {
    localStorage.setItem("admin", JSON.stringify(admin));
}
if (localStorage.getItem("projector") === null) {
    localStorage.setItem("projector", JSON.stringify(projector));
}
if (localStorage.getItem("user") === null) {
    localStorage.setItem("user", JSON.stringify([]));
}
//# sourceMappingURL=users.js.map