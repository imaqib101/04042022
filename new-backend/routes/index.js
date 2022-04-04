const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload");

let routes = (app) => {
  router.post("/upload", uploadController.uploadFiles);
  router.get("/files", uploadController.getListFiles);
  router.get("/files/:name", uploadController.download);
  router.post("/extract-text", uploadController.extractText);
  router.post("/post-data", uploadController.postData);
  router.get("/view-data", uploadController.viewSavedData);
  return app.use("/", router);
};

module.exports = routes;
