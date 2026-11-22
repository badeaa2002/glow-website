import { Role } from "../user_model/user_model.js";
import { checkRole } from "../check_role/check_role.js";
//check for admin page
export function canAccessAdminPage() {
    return checkRole(Role.Admin) ||
        checkRole(Role.manager);
}
//check for home page
export function canAccessHome() {
    return !checkRole(Role.manager);
}
//check the current user
export function isLoggedIn() {
    return localStorage.getItem("currentUser") !== null;
}
//check for users managment
export function canManageUsers() {
    return checkRole(Role.Admin);
}
//check if manager go to categories
export function getLoginRedirect() {
    if (checkRole(Role.manager)) {
        return "../categories/categories.html";
    }
    return "../home/home.html";
}
//check if can delete products
export function canDelete() {
    return checkRole(Role.Admin) ||
        checkRole(Role.manager);
}
//# sourceMappingURL=permissions.js.map