import bcrypt from "bcrypt";
import { createUser } from "../models/users.js";
import { authenticateUser } from "../models/users.js";

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

        console.log(user);

        res.redirect("/");

    } else {

        res.redirect("/login");

    }
}

export async function processLogout(req, res) {

    req.session.destroy(() => {
        res.redirect("/login");
    });

}