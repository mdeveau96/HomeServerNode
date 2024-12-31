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

const router = express.Router();

router.get("/login", getLogin);
router.post("/login", postLogin);
router.post("/logout", postLogout);
// router.get("/request-password-reset", getPWResetRequest);
// router.post("/request-password-reset", postPWResetRequest);
// router.get("/reset-password", getPWReset);
// router.post("/reset-password", postPWReset);

export default router;
