const pdfParse = require("pdf-parse");
const util = require("util");
const multer = require("multer");
const uuid = require("uuid");
// const fs = require("fs");
const { GridFsStorage } = require("multer-gridfs-storage");
// const mongodb = require("mongodb");

const dbConfig = require("../config/db");

let storage = new GridFsStorage({
  url: dbConfig.url + dbConfig.db,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["file/pdf", "file/pdf"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${uuid()}-original-${path.extname(file.originalname)}`;
      return filename;
    }

    return {
      bucketName: dbConfig.fileBucket,
      filename: `${uuid()}-original-${path.extname(file.originalname)}`,
    };
  },
});

let uploadFiles = multer({ storage: storage }).array("files", 10);
let uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = uploadFilesMiddleware;
