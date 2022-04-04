const dbConfig = require("../config/db");

const MongoClient = require("mongodb").MongoClient;

const GridFSBucket = require("mongodb").GridFSBucket;

const url = dbConfig.url;

const baseUrl = "http://localhost:8080/files/";

const mongoClient = new MongoClient(url);

const uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.files);

    if (req.files.length <= 0) {
      return res
        .status(400)
        .send({ message: "You must select at least 1 file." });
    }

    return res.status(200).send({
      message: "Files have been uploaded.",
    });

    // console.log(req.file);

    // console.log(req.file);

    // if (req.file == undefined) {
    //   return res.send({
    //     message: "You must select a file.",
    //   });
    // }

    // return res.send({
    //   message: "File has been uploaded.",
    // });
  } catch (error) {
    console.log(error);
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).send({
        message: "Too many files to upload.",
      });
    }
    return res.status(500).send({
      message: `Error when trying upload many files: ${error}`,
    });

    // return res.send({
    //   message: "Error when trying upload file: ${error}",
    // });
  }
};

const getListFiles = async (req, res) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db(dbConfig.database);

    const files = database.collection(dbConfig.fileBucket + "files");

    const cursor = files.find({});

    if ((await cursor.count()) === 0) {
      return res.status(404).send({
        message: "No files found.",
      });
    }

    let fileInfo = [];
    await cursor.forEach((file) => {
      fileInfo.push({
        id: file._id,
        name: file.filename,
        url: baseUrl + file._id,
      });
    });
    return res.status(200).send({
      message: "Files have been listed.",
      files: fileInfo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Error when trying list files: ${error}`,
    });
  }
};

const download = async (req, res) => {
  try {
    await mongoClient.connect();

    const bucket = new GridFSBucket(mongoClient.db(dbConfig.database));

    const fileId = req.params.id;

    const downloadStream = bucket.openDownloadStream(fileId);

    downloadStream.pipe(res);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Error when trying download file: ${error}`,
    });
  }
};

module.exports = {
  uploadFiles,
  getListFiles,
  download,
};
