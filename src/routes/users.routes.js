import { Router } from "express";
import * as ctrlUser from "../controllers/users.controllers.js";
import * as auth from "../middleware/auth.js";
import {verifyDuplicateEmail} from "../middleware/verifySignup.js"

const router = Router();

router.get("/getAll/users", auth.isWork, ctrlUser.getAllUser);

router.post("/post/admin", auth.isSuperAdmin, verifyDuplicateEmail,ctrlUser.postWork);

export default router;
