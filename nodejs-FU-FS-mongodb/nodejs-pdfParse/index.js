const express = require("express");
// const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
// const fs = require("fs");
const app = express();

app.use("/", express.static("public"));
// app.use(fileUpload());

// fs.writeFileSync();
// app.post("/upload", function (req, res) {
//   console.log(req.files.foo);
// });

app.post("/extract-text", (req, res) => {
  console.log(req.files);
  if (!req.files && !req.files.pdfFile) {
    res.status(400);
    res.end();
  }

  pdfParse(req.files.pdfFile).then((result) => {
    res.send(result.text);
  });
});

app.listen(5000);
