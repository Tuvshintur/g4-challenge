const { fork } = require("child_process");
require("dotenv").config();

(() => {
    const fileName = process.argv[2];
    const mapFileName = process.argv[3];

    const childProcess = fork("migrateSql.js");
    childProcess.send({ fileName: fileName, mapFileName: mapFileName });

    childProcess.on("message", (msg) => {
        console.log(msg);
    });
})();
