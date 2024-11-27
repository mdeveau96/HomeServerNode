import express, { Router } from "express";
import { getFile, getUploads, postAddUpload } from "../controllers/uploads.js";

const router = express.Router();

router.get("/", getUploads);
router.post("/", postAddUpload);
router.get("/:fileName", getFile);

export default router;
