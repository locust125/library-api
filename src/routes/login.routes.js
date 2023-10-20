import * as ctrlLogin from "../controllers/login.controllers.js"
import * as vcUser from "../validators/users.js"
import { Router } from "express"
import {verifyDuplicateEmail} from "../middleware/verifySignup.js"

const router = Router()

router.post("/sigin",ctrlLogin.SignIn)
router.post("/signup", verifyDuplicateEmail,vcUser.validateCreate,ctrlLogin.SignUp)

export default router