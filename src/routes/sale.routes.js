import { Router } from "express";
import * as ctrlSale from "../controllers/Sale.controllers.js";

const router = Router();

router.post('/cart/payment', ctrlSale.processPayment);


export default router;
