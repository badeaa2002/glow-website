
import { Role } from "../user_model/user_model.js";
import { checkRole } from "../check_role/check_role.js";

//check for admin page
export function canAccessAdminPage(): boolean {
    return checkRole(Role.Admin) ||
           checkRole(Role.manager);
}
//check for home page
export function canAccessHome(): boolean {
    return !checkRole(Role.manager);
}

//check the current user
export function isLoggedIn(): boolean {
    return localStorage.getItem("currentUser") !== null;
}

//check for users managment
export function canManageUsers(): boolean {
    return checkRole(Role.Admin);
}

//check if manager go to categories
export function getLoginRedirect(): string {
    if (checkRole(Role.manager)) {
        return "../categories/categories.html";
    }
    return "../home/home.html";
}

//check if can delete products
export function canDelete(): boolean {
    return checkRole(Role.Admin) ||
           checkRole(Role.manager);
}