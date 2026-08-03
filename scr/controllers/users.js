import bcrypt from "bcrypt";
import { 
    createUser,
    authenticateUser,
    getAllUsers
} from "../models/users.js";

const saltRounds = 10;

export async function showUserRegistrationForm(req, res) {
    res.render("register", {
        title: "Register"
    });
}

// POST /register
export async function processUserRegistrationForm(req, res) {
    try {
        const { name, email, password } = req.body;

        const passwordHash = await bcrypt.hash(password, saltRounds);

        await createUser(name, email, passwordHash);

        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Registration failed");
    }
}

export async function showLoginForm(req, res) {
    res.render("login", {
        title: "Login"
    });
}

export async function processLoginForm(req, res) {

    const { email, password } = req.body;

    const user = await authenticateUser(email, password);

    if (user) {

        req.session.user = user;

        console.log(req.session.user);

        res.redirect("/dashboard");

    } else {

        res.redirect("/login");

    }
}

export async function processLogout(req, res) {

    req.session.destroy(() => {
        res.redirect("/login");
    });

}

export function requireLogin(req, res, next) {

    if (!req.session.user) {

        res.redirect("/login");

        return;
    }

    next();
}

export function showDashboard(req, res) {

    const { name, email } = req.session.user;

    res.render("dashboard", {
        title: "Dashboard",
        name,
        email
    });
}

export function requireRole(role) {

    return (req, res, next) => {

        if (
            req.session.user &&
            req.session.user.role_name === role
        ) {

            next();

        } else {

            res.redirect("/");

        }

    };

}

const showUsersPage = async (req, res) => {

    const users = await getAllUsers();

    const title = "Registered Users";

    res.render("users", {
        title,
        users
    });

};

export {
    showUsersPage
};
