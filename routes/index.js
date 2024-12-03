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
router.get("/home", isAuthenticated, getUploads);
router.post("/home", isAuthenticated, postAddUpload);
router.get("/home/:fileName", isAuthenticated, getFile);

export default router;
