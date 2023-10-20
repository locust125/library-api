import { Router } from "express";
import * as ctrbooks from "../controllers/books.controllers.js";
import fileUpload from "express-fileupload";
import * as auth from "../middleware/auth.js";

const router = Router();

router.post(
    "/create/books",
    auth.isWork,
    fileUpload({
        useTempFiles: true,
        tempFileDir: "./uploads",
    }),
    ctrbooks.postBook
);
router.get("/getAll/books", ctrbooks.getAllBooks);
router.get("/getOne/:id", ctrbooks.getBookById);
router.delete("/delete/:id", ctrbooks.deleteBookById);
router.put(
    "/update/:id",
    fileUpload({
        useTempFiles: true,
        tempFileDir: "./uploads",
    }),
    ctrbooks.updateBook
);

export default router;
