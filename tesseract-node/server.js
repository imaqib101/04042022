const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const createWorker = require("tesseract.js");

const imagePath = process.argv[2];

const image = path.resolve("../../tesseract/src/assets/0001.jpg");

const hashedValue = crypto.createHash("md5").update(image).digest("hex");

console.log(`Recognizing ${image}`);

const worker = createWorker({
  logger: (m) => {
    console.log(m);
  },
});

(async () => {
  await worker.load(); // 1
  await worker.loadLanguage("eng"); // 2
  await worker.initialize("eng");

  const {
    data: { text },
  } = await worker.recognize(image); // 3

  await fs.writeFile(`${image}-${hashedValue}.txt`, text, (err) => {}); // 4
  await worker.terminate(); // 5
})();
