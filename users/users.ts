
export enum Role {
    Admin = 1,
    User = 2,
    Projector = 3
}

export class User {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public role: Role = Role.User
    ) {}
}

const admin = new User(
    "Admin",
    "admin@glow.com",
    "admin123",
    Role.Admin
);

const projector = new User(
    "Projector",
    "projector@glow.com",
    "projector123",
    Role.Projector
);

if (localStorage.getItem("admin") === null) {
    localStorage.setItem("admin", JSON.stringify(admin));
}

if (localStorage.getItem("projector") === null) {
    localStorage.setItem("projector", JSON.stringify(projector));
}

if (localStorage.getItem("user") === null) {
    localStorage.setItem("user", JSON.stringify([]));
}
