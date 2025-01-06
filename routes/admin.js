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
import pkg from "express-validator";
const { body } = pkg;

const router = express.Router();

router.get("/", isAuth, getAdminHome);
router.get("/home", isAuth, getAdminUploads);
router.get("/users", getAdminUsers);
router.get("/signup", getAdminSignUp);
router.post(
  "/signup",
  [
    body("email").trim().isEmail().withMessage("Please enter a valid email"),
    body("phoneNumber")
      .trim()
      .custom((value, { req }) => {
        const rePN = /\d{3}\d{3}\d{4}/;
        if (!rePN.test(value)) {
          return new Error("Not a valid phone number");
        }
        return true;
      }),
    body("password1").trim().isLength({ min: 8 }),
    body("password2")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password2) {
          return new Error("Passwords do not match");
        }
        return true;
      }),
  ],
  postAdminSignup
);
router.post("/delete-file", isAuth, postAdminDeleteFile);

export default router;
