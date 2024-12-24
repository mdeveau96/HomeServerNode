import express, { Router } from "express";
import { isAuth } from "../middleware/is-auth.js";
import {
  getAdminUploads,
  getAdminHome,
  getAdminUsers,
  getAdminSignUp,
  postAdminSignup,
} from "../controllers/admin.js";

const router = express.Router();

router.get("/", isAuth, getAdminHome);
router.get("/home", isAuth, getAdminUploads);
router.get("/users", isAuth, getAdminUsers);
router.get("/signup", isAuth, getAdminSignUp);
router.post("/signup", isAuth, postAdminSignup);

export default router;
