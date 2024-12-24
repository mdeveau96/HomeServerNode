import express, { Router } from "express";
import { isAuth } from "../middleware/is-auth.js";
import {
  getFile,
  getHome,
  getUploads,
  postAddUpload,
} from "../controllers/uploads.js";

const router = express.Router();

router.get("/", isAuth, getHome);
router.get("/home", isAuth, getUploads);
router.post("/home", isAuth, postAddUpload);
router.get("/uploads/:fileName", isAuth, getFile);

export default router;
