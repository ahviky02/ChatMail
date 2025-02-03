import express from "express";
import { getMailUsers, getReceiveMails, getSendMails, composeMails } from "../controllers/mail.controller.js";


const router = express.Router();

router.get("/users",getMailUsers);
router.post("/getSendMails",getSendMails);
router.post("/getReceiveMails",getReceiveMails);
router.post("/composeMails",composeMails);
export default router;