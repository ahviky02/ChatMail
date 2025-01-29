import express from "express";
import { getChatUsers } from "../controllers/chat.controller.js";
import { protectRoutes } from '../middleware/auth.middleware.js';


const router = express.Router();

router.get("/users",getChatUsers);
export default router;