import {
  register
} from "./chunk-MW7TESTX.js";

// src/routes/auth/registerRoute.ts
import express from "express";
var router = express.Router();
router.post("/", register);
var registerRoute_default = router;

export {
  registerRoute_default
};
