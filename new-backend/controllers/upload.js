const upload = require("../middleware/upload");
const db = require("../config/db");

const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const GridFsBucket = require("mongodb").GridFsBucket;

const url = db.url;

let dbConn = mongodb.MongoClient.connect(
  "mongodb://localhost:27017/saved_data"
);

const baseUrl = "http://localhost:8080/files/";

const mongoClient = new MongoClient(url);

const uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.files);

    if (req.files.length <= 0) {
      return res
        .status(400)
        .send({ message: "You must at least 1 file to upload" });
    }

    return res.status(200).send({
      message: "File uploaded successfully",
    });
  } catch (err) {
    console.log(err);

    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).send({
        message: "File size is too big",
      });
    }
    return res.status(500).send({
      message: "Error uploading file",
    });
  }
};

const getListFiles = async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db(database.db);
    const files = database.collection(database.fileBucket + ".files");

    const cursor = files.find({});

    if ((await cursor.count()) <= 0) {
      return res.status(404).send({
        message: "No files found",
      });
    }

    let filesInfos = [];
    await cursor.forEach((file) => {
      filesInfos.push({
        id: file._id,
        name: file.filename,
        url: baseUrl + file._id,
      });
    });

    return res.status(200).send(filesInfos);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Error getting files",
    });
  }
};

const download = async (req, res) => {
  try {
    await mongoClient.connect();

    const db = mongoClient.db(dbConfig.db);
    const bucket = new GridFsBucket(db, {
      bucketName: dbConfig.fileBucket,
    });

    let downloadStream = bucket.openDownloadStream(req.params.id);

    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", (err) => {
      return res.status(400).send({
        message: "Error downloading file",
      });
    });
    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Error downloading file",
    });
  }
};

const extractText = async (req, res) => {
  console.log(req.files);
  if (!req.files && !req.files.pdfFile) {
    res.status(400).send("No files were uploaded.");
    res.end();
  }

  pdfParser(req.files.pdfFile).then((result) => {
    res.send(result.text);
  });
};

const postData = function (req, res) {
  dbConn.then(function (db) {
    delete req.body._id;
    db.collection("data").insertOne(req.body);
  });
  res.send(`Data received:\n ${JSON.stringify(req.body)}`);
};

const viewSavedData = function (req, res) {
  dbConn.then(function (db) {
    db.collection("data")
      .find({})
      .toArray()
      .then(function (data) {
        res.status(200).json(data);
      });
  });
};

module.exports = {
  uploadFiles,
  getListFiles,
  download,
  postData,
  viewSavedData,
  extractText,
};
