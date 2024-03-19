import { login, logout, register, update, userProfile } from "../controller/userController.js";
import { Router } from "express";
import {upload} from "../middleware/multerMiddleware.js"
import userAuthentication from "../middleware/authenticateMiddleware.js";

const router = Router();

router.post("/register",upload.single("avatar"),register);
router.post("/login",login);
router.get("/logout",userAuthentication,logout);
router.put("/update",update);
router.get("/profile",userAuthentication,userProfile);

export default router;