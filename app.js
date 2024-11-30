import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import bodyParser from "body-parser";
import multer from "multer";
import indexRoutes from "./routes/index.js";
import authRoutes from "./routes/auth.js";
import { get404 } from "./controllers/error.js";

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

app.set("view engine", "ejs");
app.set("views", "views");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage }).single("fileUpload"));
app.use(express.static(path.join(__dirname, "public")));

app.use(indexRoutes);
app.use(authRoutes);

app.use(get404);

app.listen(3000, () => {
  console.log("Server Running...");
});
