import {Router} from "express";
import { authorization } from "../middlewares/auth.js";
import * as photocontroller from "../controller/photo.js";
import { uploadImage} from "../middlewares/upload.js";

import * as userController from "../controller/user.js"
const router =Router();
router.post("/api/v1/user/signup",userController.signup);
router.post("/api/v1/user/signin",userController.signin);
// testing purpose
router.get("/api/v1/user/me",authorization,userController.me);

router.post("/api/v1/photo/upload",authorization,uploadImage,photocontroller.upload);
router.post("/api/v1/photo/enhance",authorization,photocontroller.enhance);
router.post("/api/v1/photo/removeBackground",authorization,photocontroller.removeBackground);


export default router;