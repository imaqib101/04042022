const util = require("util");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const { GridFsStorage } = require("multer-gridfs-storage");

const dbConfig = require("../config/db");
const fs = require("fs");

let storage = new GridFsStorage({
  url: dbConfig.url + dbConfig.database,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["file/pdf", "file/txt", "file/doc", "file/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${uuidv4()}-original-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: dbConfig.fileBucket,
      filename: `${uuidv4()}-original-${file.originalname}`,
    };
  },
});

let uploadFiles = multer({ storage: storage }).array("file", 10);
// let uploadFiles = multer({ storage: storage }).single("file");
let uploadFilesMiddleware = util.promisify(uploadFiles);

//TODO: Write file as new file to fs and db

fs.writeFile("../tests/test", file, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});

module.exports = uploadFilesMiddleware;
