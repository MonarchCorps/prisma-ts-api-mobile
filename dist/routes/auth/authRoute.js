import express from "express";
import { login, logout, refresh } from "../../controllers/auth/authController";
const router = express.Router();
router.post("/login", login);
router.post("/refresh", refresh);
router.get("/logout", logout);
export default router;
