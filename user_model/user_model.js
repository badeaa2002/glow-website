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
//# sourceMappingURL=user_model.js.map