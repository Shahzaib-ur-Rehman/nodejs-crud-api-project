const writeToFile = require("../utill/write-to-file");
module.exports = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    let url = req.url;
    const baseUrl = url.substring(0, url.lastIndexOf("/"));
    const UUID = url.substring(url.lastIndexOf("/") + 1);
    const regex = new RegExp(
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
    );
    if (baseUrl === "/api/movies" && regex.test(UUID)) {
        try {
            const index = req.movies.findIndex((movie) => {
                return movie.id === UUID;
            })
            if (index!==-1) {
                const filteredData = req.movies.filter((movie) => {
                    return movie.id !== UUID;
                });
                req.movies = filteredData;
                writeToFile(req.movies);
                res.statusCode = 204;
                res.write(JSON.stringify(req.movies));
                res.end();
            } else {
                res.statusCode = 404;
                res.write(
                    JSON.stringify({
                        title: "Not Found",
                        message: "Movie Not Found!",
                    })
                );
                res.end();
            }

        } catch (error) {
            res.statusCode = 404;
            res.write(
                JSON.stringify({
                    title: "Validation Failed",
                    message: "Something Went Wrong!",
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
};
