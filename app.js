import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import bodyParser from "body-parser";
import multer from "multer";
import indexRoutes from "./routes/index.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import { get404 } from "./controllers/error.js";
import { getLogin } from "./controllers/auth.js";
import { sequelize } from "./services/db.js";
import Database from "better-sqlite3";
import session from "express-session";

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// const createFileTable = `CREATE TABLE IF NOT EXISTS files(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
//                                                           file_name varchar(100) NOT NULL,
//                                                           path varchar(200) NOT NULL,
//                                                           size varchar(50) NOT NULL,
//                                                           upload_date DATETIME NOT NULL);`;
// const createUserTable = `CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
//                                                           user_name varchar(100) NOT NULL UNIQUE,
//                                                           email varchar(200) NOT NULL UNIQUE,
//                                                           phoneNumber varchar(10) NOT NULL,
//                                                           password varchar(100) NOT NULL UNIQUE);`;

// export const DB = new Database(
//   path.resolve("file.db"),
//   { fileMustExist: true },
//   (err) => {
//     console.error(err.message);
//   }
// );
// DB.pragma("journal_mode = WAL");

// DB.exec(createFileTable);
// DB.exec(createUserTable);

app.set("view engine", "ejs");
app.set("views", "views");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage }).single("fileUpload"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "changeMe",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

app.use("/admin", adminRoutes);
app.use(indexRoutes);
app.use(authRoutes);

app.use(get404);

sequelize
  .sync()
  .then((result) => {
    app.listen(3000, () => {
      console.log("Server Running...");
    });
  })
  .catch((err) => {
    console.log(err);
  });
