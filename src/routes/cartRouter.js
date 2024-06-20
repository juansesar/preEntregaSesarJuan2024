import { Router } from "express";
import * as controller from "../controllers/cartControlers.js";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
router.post("/:cartId/products/:prodId", controller.addProdToCart);
router.delete("/:cartId/products/:prodId", controller.removeProdToCart);
router.put("/:cartId/products/:prodId", controller.updateProdQuantityToCart);
router.delete("/clear/:idCart", controller.clearCart);

export default router;
