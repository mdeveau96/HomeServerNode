import express, { Router } from "express";
import {
  getLogin,
  postLogin,
  postLogout,
  // getPWReset,
  // postPWReset,
  // getPWResetRequest,
  // postPWResetRequest,
} from "../controllers/auth.js";
import pkg from "express-validator";
const { body } = pkg;

const router = express.Router();

router.get("/login", getLogin);
router.post(
  "/login",
  [
    body("email").trim().isEmail(),
    body("password").trim().isLength({ min: 8 }),
  ],
  postLogin
);
router.post("/logout", postLogout);
// router.get("/request-password-reset", getPWResetRequest);
// router.post("/request-password-reset", postPWResetRequest);
// router.get("/reset-password", getPWReset);
// router.post("/reset-password", postPWReset);

export default router;
