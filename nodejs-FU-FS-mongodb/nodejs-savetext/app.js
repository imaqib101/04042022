let express = require("express");
let path = require("path");
let bodyParser = require("body-parser");
let mongodb = require("mongodb");

let dbConn = mongodb.MongoClient.connect(
  "mongodb://localhost:27017/saved_data"
);

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "public")));
app.post("/post-data", function (req, res) {
  dbConn.then(function (db) {
    delete req.body._id;
    db.collection("data").insertOne(req.body);
  });
  res.send("Data received:\n" + JSON.stringify(req.body));
});

app.get("/view-data", function (req, res) {
  dbConn.then(function (db) {
    db.collection("data")
      .find({})
      .toArray()
      .then(function (data) {
        res.status(200).json(data);
      });
  });
});

app.listen(process.env.PORT || 3000);
