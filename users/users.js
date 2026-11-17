export var Role;
(function (Role) {
    Role[Role["Admin"] = 1] = "Admin";
    Role[Role["User"] = 2] = "User";
    Role[Role["manager"] = 3] = "manager";
})(Role || (Role = {}));
export class User {
    id;
    name;
    email;
    password;
    role;
    constructor(id, name, email, password, role = Role.User) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
let users = JSON.parse(localStorage.getItem("userlist") || "[]");
const admin = new User(1, "Admin", "admin@glow.com", "admin123", Role.Admin);
users.push(admin);
localStorage.setItem(("userlist"), JSON.stringify(users));
const manager = new User(2, "manager", "projector@glow.com", "projector123", Role.manager);
users.push(manager);
localStorage.setItem(("userlist"), JSON.stringify(users));
//# sourceMappingURL=users.js.map