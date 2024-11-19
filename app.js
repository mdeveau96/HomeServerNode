import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { getUploads, postAddUpload } from "./controllers/uploads.js";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: "uploads" }).single("fileUpload"));
app.use(express.static(path.join(__dirname, "public")));

app.use(getUploads);
app.use(postAddUpload);

app.listen(3000);
