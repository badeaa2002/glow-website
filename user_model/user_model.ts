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