const bodyParser = require('../utill/body-parser');
const crypto = require('crypto');
const writeToFile = require('../utill/write-to-file')
module.exports = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    if (req.url === '/api/movies') {
        try {
            const data = await bodyParser(req);
            const UUID = crypto.randomUUID();
            const requireData = { ...data, id: UUID };
            req.movies.push(requireData);
            writeToFile(req.movies);
            res.statusCode = 201;
            res.write(JSON.stringify(req.movies));
            res.end();
        } catch (error) {
            res.statusCode = 404;
            res.write(
                JSON.stringify({
                    title: "Validation Failed",
                    message: "Request body is not valid",
                })
            );
            res.end();

        }
    } else {
        res.statusCode = 404;
        res.write(
            JSON.stringify({
                title: "Not Found",
                message: "Route Not Found!",
            })
        );
        res.end();
    }


}