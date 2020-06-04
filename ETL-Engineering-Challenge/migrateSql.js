const fs = require("fs");
const path = require("path");
const fastcsv = require("fast-csv");
const mysql = require("mysql");

const load = (message) => {
    const { fileName, mapFileName } = message;
    console.log(path.join(__dirname, fileName));
    //since map file is small i load it synchronously
    const mapFileData = fs.readFileSync(path.join(__dirname, mapFileName), { encoding: "utf8", flag: "r" });
    const rows = mapFileData.split("\n");
    const columns = rows[0].split(",");

    const stream = fs.createReadStream(path.join(__dirname, fileName));
    const csvData = [];
    const csvStream = fastcsv
        .parse()
        .on("data", function (data) {
            csvData.push(data);
        })
        .on("end", function () {
            // remove the first line: header
            csvData.shift();

            // Get constants from Environment or use default
            const host = process.env.DB_HOST || "localhost";
            const user = process.env.DB_USER || "g4_challenge";
            const password = process.env.DB_PASS || "g4_challenge";
            const database = process.env.DB_DATABASE || "g4_challenge";
            const port = process.env.DB_PORT || "3306";
            const table = process.env.DB_TABLE || "customer";

            // create a new connection to the database
            const connection = mysql.createConnection({
                host: host,
                user: user,
                port: port,
                password: password,
                database: database,
            });

            // open the connection
            connection.connect((error) => {
                if (error) {
                    console.error(error);
                    process.exit(0);
                } else {
                    const createDBQuery =
                        "CREATE TABLE IF NOT EXISTS ?? (" +
                        "`id` int(11) unsigned NOT NULL AUTO_INCREMENT," +
                        "`email` varchar(255) NOT NULL DEFAULT ''," +
                        "`first_name` varchar(30) DEFAULT NULL," +
                        "`last_name` varchar(50) DEFAULT NULL," +
                        "`ip` varchar(15) DEFAULT NULL," +
                        "`latitude` float(10,6) DEFAULT NULL," +
                        "`longitude` float(10,6) DEFAULT NULL," +
                        "`created_at` datetime NOT NULL," +
                        "`updated_at` datetime DEFAULT NULL," +
                        "PRIMARY KEY (`id`)," +
                        "UNIQUE KEY `UNIQUE_EMAIL` (`email`)" +
                        " ) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
                    connection.query(createDBQuery, [table], (error, response) => {
                        console.log(error || response);
                        if (error) {
                            process.exit(0);
                        } else {
                            const insertQuery = "INSERT INTO ?? (??) VALUES ?;";
                            connection.query(
                                insertQuery,
                                [process.env.DB_TABLE, columns, csvData],
                                (error, response) => {
                                    console.log(error || response);
                                    process.exit(0);
                                }
                            );
                        }
                    });
                }
            });
        });

    stream.pipe(csvStream);
};

process.on("message", (message) => {
    load(message);
    process.send("done");
});
