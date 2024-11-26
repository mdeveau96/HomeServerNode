import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import bodyParser from "body-parser";
import multer from "multer";
import indexRoutes from "./routes/index.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: "uploads" }).single("fileUpload"));
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });
// app.use(multer({ storage: storage }));
app.use(express.static(path.join(__dirname, "public")));

app.use(indexRoutes);

app.listen(3000);
