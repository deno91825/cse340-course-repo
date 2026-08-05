import bcrypt from "bcrypt";

import { 
    createUser,
    authenticateUser,
    getAllUsers
} from "../models/users.js";

const saltRounds = 10;

// GET /register
const showUserRegistrationForm = async (req, res) => {
    res.render("register", {
        title: "Register"
    });
};

// POST /register
const processUserRegistrationForm = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const passwordHash = await bcrypt.hash(password, saltRounds);

        await createUser(name, email, passwordHash);

        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Registration failed");
    }
};

// GET /login
const showLoginForm = async (req, res) => {
    res.render("login", {
        title: "Login"
    });
};

// POST /login
const processLoginForm = async (req, res) => {
    const { email, password } = req.body;

    const user = await authenticateUser(email, password);

    if (user) {
        req.session.user = user;

        console.log(req.session.user);

        res.redirect("/dashboard");
    } else {
        res.redirect("/login");
    }
};

// GET /logout
const processLogout = async (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
};

// Middleware: require login
const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        res.redirect("/login");
        return;
    }

    next();
};

// Middleware factory: require role
const requireRole = (role) => {
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
};

// Dashboard
const showDashboard = (req, res) => {
    const { name, email } = req.session.user;

    res.render("dashboard", {
        title: "Dashboard",
        name,
        email
    });
};

// Users page
const showUsersPage = async (req, res) => {
    const users = await getAllUsers();

    const title = "Registered Users";

    res.render("users", {
        title,
        users
    });
};

export {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    showDashboard,
    requireRole,
    showUsersPage
};