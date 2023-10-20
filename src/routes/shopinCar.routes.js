import { Router } from "express";
import * as ctrCart from "../controllers/shopingCart.controller.js";

const router = Router();

router.post("/addCart", ctrCart.addToCart)
router.put("/quantity", ctrCart.updateCartItemQuantity)
router.get("/user/:userId", ctrCart.getCart)
router.delete("/cart/:userId/:productId", ctrCart.removeFromCart)
router.delete("/cart/:userId", ctrCart.removeAllCart)

router.post('/cart/payment', ctrCart.processPayment);

export default router;
