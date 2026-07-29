const flashMiddleware = (req, res, next) => {

    req.flash = function(type, message) {

        if (!req.session.flash) {
            req.session.flash = {
                success: [],
                error: [],
                warning: [],
                info: []
            };
        }
        // Adding a message
        if (type && message) {

            if (!req.session.flash[type]) {
                req.session.flash[type] = [];
            }

            req.session.flash[type].push(message);
            console.log(req.session.flash);
            return;
        }

        // Getting messages of one type
        if (type && !message) {

            const messages = req.session.flash[type] || [];

            req.session.flash[type] = [];

            return messages;
        }

        // Getting all messages
        const messages = req.session.flash;

        req.session.flash = {
            success: [],
            error: [],
            warning: [],
            info: []
        };

return messages;

    };

    next();
};

const flashLocals = (req, res, next) => {
    res.locals.flash = req.flash;

    next();

};


const flash = (req, res, next) => {

    flashMiddleware(req, res, () => {

        flashLocals(req, res, next);

    });

};


export default flash;