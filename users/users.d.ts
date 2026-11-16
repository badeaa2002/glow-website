export declare enum Role {
    Admin = 1,
    User = 2,
    Projector = 3
}
export declare class User {
    name: string;
    email: string;
    password: string;
    role: Role;
    constructor(name: string, email: string, password: string, role?: Role);
}
//# sourceMappingURL=users.d.ts.map