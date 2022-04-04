const util = require("util");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const { GridFsStorage } = require("multer-gridfs-storage");

const dbConfig = require("../config/db");

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

// let storageDisk = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "/tmp/my-uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

// let uploadDisk = multer({ storageDisk: storageDisk });
// let uploadDiskMiddelware = util.promisify(uploadDisk.single("file"));

module.exports = uploadFilesMiddleware;
// uploadDiskMiddelware,
