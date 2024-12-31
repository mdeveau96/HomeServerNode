import express, { Router } from "express";
import { isAuth } from "../middleware/is-auth.js";
import {
  getAdminUploads,
  getAdminHome,
  getAdminUsers,
  getAdminSignUp,
  postAdminSignup,
  postAdminDeleteFile,
} from "../controllers/admin.js";

const router = express.Router();

router.get("/", isAuth, getAdminHome);
router.get("/home", isAuth, getAdminUploads);
router.get("/users", getAdminUsers);
router.get("/signup", getAdminSignUp);
router.post("/signup", postAdminSignup);
router.post("/delete-file", isAuth, postAdminDeleteFile);

export default router;
