
export enum Role {
    Admin = 1,
    User = 2,
    manager = 3
}

export class User {
    constructor(
        public id:number,
        public name: string,
        public email: string,
        public password: string,
        public role: Role = Role.User
    ) {}
}

let users:User[] =JSON.parse(
 localStorage.getItem("userlist")||"[]");

if(!localStorage.getItem("userlist")){

const admin = new User(
    1,
    "Admin",
    "admin@glow.com",
    "admin123",
    Role.Admin
);

const manager = new User(
    2,
    "manager",
    "projector@glow.com",
    "projector123",
    Role.manager
);

    users.push(admin,manager);
    localStorage.setItem(("userlist"),JSON.stringify(users));

 

}