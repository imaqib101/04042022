//create express app port
const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const pdf = require("pdf-parse");
const app = express();

app.use(fileUpload());
app.use(express.static("public"));
let dataBuffer = fs.readFileSync("./sample/sample.pdf");

pdf(dataBuffer).then(function (data) {
  // number of pages
  console.log(data.numpages);
  // number of rendered pages
  console.log(data.numrender);
  // PDF info
  console.log(data.info);
  // PDF metadata
  console.log(data.metadata);
  // PDF.js version
  // check https://mozilla.github.io/pdf.js/getting_started/
  console.log(data.version);
  // PDF text
  console.log(data.text);
});

app.post("/upload", function (req, res) {
  console.log(req.files.pdf);
  res.send("File uploaded!");
});

const port = process.env.PORT || 12000;

app.listen(port, () => console.log(`Server started on port ${port}`));
