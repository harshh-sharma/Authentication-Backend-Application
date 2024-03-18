import { login, logout, register, update, userProfile } from "../controller/userController.js";
import { Router } from "express";
import {upload} from "../middleware/multerMiddleware.js"

const router = Router();

router.post("/register",upload.single("avatar"),register);
router.post("/login",login);
router.get("/logout",logout);
router.post("/profile",userProfile);
router.put("/update",update);

export default router;