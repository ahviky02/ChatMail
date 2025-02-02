import express from "express";
import { getChatUsers,getChatMessages ,sentMessage} from "../controllers/chat.controller.js";
import { protectRoutes } from '../middleware/auth.middleware.js';


const router = express.Router();

router.get("/users",getChatUsers);
router.post("/getMessages",getChatMessages);
router.post("/sentMessage",sentMessage);
export default router;