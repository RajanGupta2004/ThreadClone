import express from "express";
import userControllers from "./controllers/userControllers.js";
import auth from "./middleware/auth.js";
import postControllers from "./controllers/postControllers.js";

const router = express.Router();

router.post("/sign-in", userControllers.signIn);
router.post("/login", userControllers.login);
router.get("/user/:id", userControllers.userDetails);
router.put("/user/follow/:id", auth, userControllers.followUser);
router.put("/update", auth, userControllers.updateProfile);
router.get("/user/search/:query", auth, userControllers.searchUser);
router.post("/logout", auth, userControllers.userLogout);
router.get("/me", auth, userControllers.myInfo);

// post routes

router.post("/post", auth, postControllers.addPost);
router.get("/post", auth, postControllers.allPost);
router.delete("/post/:id", auth, postControllers.deletePost);

export default router;
