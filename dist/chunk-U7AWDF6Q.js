import {
  login,
  logout,
  refresh
} from "./chunk-VEKTTKLG.js";

// src/routes/auth/authRoute.ts
import express from "express";
var router = express.Router();
router.post("/login", login);
router.post("/refresh", refresh);
router.get("/logout", logout);
var authRoute_default = router;

export {
  authRoute_default
};
