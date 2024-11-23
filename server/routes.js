import express from "express";
import userControllers from "./controllers/userControllers.js";

const router = express.Router();

router.post("/sign-in", userControllers.signIn);
router.post("/login", userControllers.login);

export default router;
