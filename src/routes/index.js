import { authorizations } from "../middlewares/authorization.middleware.js";
import authRoutes from "./authRouter.js";
import cartRoutes from "./cartRouter.js";
import productRoutes from "./productRouter.js";
import { Router } from "express";

const router = Router();

router.use("/auth", authRoutes);
router.use("/cart", authorizations(["user"]), cartRoutes);
router.use("/products", productRoutes);

export default router;