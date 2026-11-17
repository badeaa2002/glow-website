export declare enum Role {
    Admin = 1,
    User = 2,
    manager = 3
}
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
    constructor(id: number, name: string, email: string, password: string, role?: Role);
}
//# sourceMappingURL=user_model.d.ts.map