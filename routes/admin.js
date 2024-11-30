import express, { Router } from "express";
import {
  getAdminUploads,
  getAdminHome,
  getAdminUsers,
  getAdminSignUp,
} from "../controllers/admin.js";

const router = express.Router();

router.get("/", getAdminHome);
router.get("/home", getAdminUploads);
router.get("/users", getAdminUsers);
router.get("/signup", getAdminSignUp);

export default router;
