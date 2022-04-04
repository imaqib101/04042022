const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const initRoutes = require("./routes");

let corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static("public"));
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});

module.export = app;
