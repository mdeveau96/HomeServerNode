import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import bodyParser from "body-parser";
import multer from "multer";
import indexRoutes from "./routes/index.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import { get404 } from "./controllers/error.js";
import { sequelize } from "./services/db.js";
import { User } from "./models/user.js";
import { csrfSync } from "csrf-sync";
import cookieParser from "cookie-parser";
import session from "express-session";
import connectSequelizeSession from "connect-session-sequelize";
import pkg from "connect-flash";
const flash = pkg;
const SequelizeStore = connectSequelizeSession(session.Store);

const app = express();
const store = new SequelizeStore({
  db: sequelize,
  expiration: 60 * 60,
});
const { csrfSynchronisedProtection } = csrfSync({
  getTokenFromRequest: (req) => {
    return req.body["CSRFToken"];
  },
});

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
app.use(
  session({
    secret: "changeMe",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
store.sync();
app.use(cookieParser("changeme2"));
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findByPk(req.session.user.id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(csrfSynchronisedProtection, (req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

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
