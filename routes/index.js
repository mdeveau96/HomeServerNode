import express, { Router } from "express";
import { getFile, getHome, getUploads, postAddUpload } from "../controllers/uploads.js";

const router = express.Router();

router.get("/", getHome);
router.get("/home", getUploads);
router.post("/home", postAddUpload);
router.get("/home/:fileName", getFile);

export default router;
