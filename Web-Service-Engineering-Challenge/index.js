const express = require("express");
const fs = require("fs");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql");
dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();
const indexRoute = require("./routes/indexRoute");
const customerRoute = require("./routes/customerRoute");

//to hide api built on express
app.set("x-powered-by", false);

//middlewares
//access log
app.use(
    logger("common", {
        stream: fs.createWriteStream(path.join(__dirname, "log/access.log"), { flags: "a" }),
    })
);

//cors stands for Cross origin resource sharing which restricts other domain requests
app.use(cors());
// parse body of request
app.use(express.json());

//set up mysql
// Get constants from Environment or use default
const host = process.env.DB_HOST || "localhost";
const user = process.env.DB_USER || "g4_challenge";
const password = process.env.DB_PASS || "g4_challenge";
const database = process.env.DB_DATABASE || "g4_challenge";
const port = process.env.DB_PORT || "3306";
const table = process.env.DB_TABLE || "customers";
//will use for db connection
let db;
app.use(async (req, res, next) => {
    try {
        if (!db) {
            const connection = mysql.createConnection({
                host: host,
                user: user,
                port: port,
                password: password,
                database: database,
            });
            await connection.connect((error) => {
                if (error) {
                    console.error(error);
                } else {
                }
            });
        }
        req.db = db;
        next();
    } catch (e) {
        next(e);
    }
});

app.use("/", indexRoute);

app.use("/customers", customerRoute);

app.listen(PORT, () => console.log(`server started on ${PORT}!`));
