import { Router } from "express";
import * as ctrlCategory from "../controllers/category.controllers.js"

const router = Router()


router.get("/getAll/category", ctrlCategory.getAllCategory)
router.delete("/deleteCategory/:categoryId", ctrlCategory.deleteCategory)
router.post("/create/category", ctrlCategory.createCategory)
router.put("/updateCategory/:id", ctrlCategory.updateCategory)
router.get("/getById/Category/:id", ctrlCategory.getByIdCategory)


export default router