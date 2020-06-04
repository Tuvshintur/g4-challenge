module.exports = function (req, res, next) {
    try {
        let obj = JSON.parse(JSON.stringify(req.body));
        console.log(obj);
        if (
            req.method === "POST" &&
            obj &&
            typeof obj === "object" &&
            obj.email &&
            obj.first_name &&
            obj.last_name &&
            obj.ip &&
            obj.latitude &&
            obj.longitude
        ) {
            next();
        } else {
            sendError(req, res, next);
        }
    } catch (err) {
        console.log(err);
        sendError(req, res, next);
    }
};

function sendError(req, res, next) {
    let err = new Error("Invalid JSON");
    err.status = 500;
    next(err);
}
