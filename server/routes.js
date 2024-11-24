import express from "express";
import userControllers from "./controllers/userControllers.js";
import auth from "./middleware/auth.js";

const router = express.Router();

router.post("/sign-in", userControllers.signIn);
router.post("/login", userControllers.login);
router.get("/user/:id", userControllers.userDetails);
router.put("/user/follow/:id", auth, userControllers.followUser);
router.put("/update", auth, userControllers.updateProfile);

export default router;
