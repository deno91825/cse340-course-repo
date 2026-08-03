import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './scr/models/db.js';
import router from './scr/routes.js';
import session from 'express-session';
import flash from './scr/middleware/flash.js';

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SESSION_SECRET = process.env.SESSION_SECRET;



const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'scr/views'));

/**
  * Configure Express middleware
  */


app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

app.use(flash);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// toServe static files from the public directory...
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{

    if(NODE_ENV === "development"){

        console.log(`${req.method} ${req.url}`);

    }

    next();

});

app.use((req, res, next) => {

    res.locals.isLoggedIn = false;

    if (req.session && req.session.user) {
        res.locals.isLoggedIn = true;
    }

    res.locals.NODE_ENV = NODE_ENV;

    next();
});

// Routes
app.use(router);


// 404 Error Handler
app.use((req, res, next) => {
    res.status(404).render('404', {
        title: 'Page Not Found'
    });
});


// 500 Error Handler
app.use((err, req, res, next) => {

    console.error("==== SERVER ERROR ====");
    console.error(err.stack);

    res.status(500).send(`
        <h1>Server Error</h1>
        <pre>${err.stack}</pre>
    `);

});


app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});