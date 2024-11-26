import express, { Router } from "express";
import { getUploads, postAddUpload } from "../controllers/uploads.js";

const router = express.Router();

router.get("/", getUploads);
router.post("/", postAddUpload);

export default router;
