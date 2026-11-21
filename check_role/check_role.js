import { Role } from "../user_model/user_model.js";
export function checkRole(role) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!currentUser) {
        return false;
    }
    if (role === Role.Admin) {
        return currentUser.role === Role.Admin;
    }
    if (role === Role.manager) {
        return currentUser.role === Role.manager;
    }
    if (role === Role.User) {
        return currentUser.role === Role.User;
    }
    return false;
}
;
//# sourceMappingURL=check_role.js.map