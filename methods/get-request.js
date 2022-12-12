module.exports = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    let url = req.url;
    const baseUrl = url.substring(0, url.lastIndexOf('/'));
    const UUID = url.substring(url.lastIndexOf('/') + 1);
    const regex = new RegExp(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi)
    if (req.url === '/api/movies') {
        res.statusCode = 200;
        res.write(JSON.stringify(req.movies));
        res.end();
    } else if (baseUrl === '/api/movies' && regex.test(UUID)) {
        const requiredMovie = req.movies.filter((movie) => {
            return movie.id === UUID;
        })
        if (requiredMovie.length > 0) {
            res.statusCode = 200;
            res.write(JSON.stringify(requiredMovie));
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
    }
    else {
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