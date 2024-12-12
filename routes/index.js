import express, { Router } from "express";
import { isAuthenticated } from "../auth/isAuthenticated.js";
import {
  getFile,
  getHome,
  getUploads,
  postAddUpload,
} from "../controllers/uploads.js";

const router = express.Router();

router.get("/", isAuthenticated, getHome);
router.get("/home", getUploads);
router.post("/home", postAddUpload);
router.get("/uploads/:fileName", getFile);

export default router;
