const http = require("http");
require("dotenv").config();
const getRequest = require("./methods/get-request");
const postRequest = require("./methods/post-request");
const putRequest = require("./methods/put-request");
const deleteRequest = require("./methods/delete-request");
const movies = require("./data/movies.json");
const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  req.movies = movies;
  switch (req.method) {
    case "GET":
      getRequest(req, res);
      break;
    case "POST":
      postRequest(req, res);
      break;
    case "PUT":
      putRequest(req, res);
      break;
    case "DELETE":
      deleteRequest(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({
          title: "Not Found",
          message: "Route Not Found!",
        })
      );
      res.end();
      break;
  }
});

server.listen(PORT, () => {
  console.log(`Server is Listining to The Port No : ${PORT}`);
});
