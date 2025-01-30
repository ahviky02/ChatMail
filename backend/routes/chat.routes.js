import express from "express";
import { getChatUsers,getChatMessages } from "../controllers/chat.controller.js";
import { protectRoutes } from '../middleware/auth.middleware.js';


const router = express.Router();

router.get("/users",getChatUsers);
router.put("/getMessages",getChatMessages);
export default router;