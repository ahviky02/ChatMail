import express from "express";
import { getMailUsers, getReceiveMails, getSendMails, compose, setMailStatus } from "../controllers/mail.controller.js";

const router = express.Router();

// Define the routes
router.get("/users", getMailUsers);
router.get("/sent", getSendMails);
router.get("/inbox", getReceiveMails);
router.put("/status", setMailStatus);
router.post("/compose", compose);

// Handle non-existing endpoints
router.use((req, res) => {
  res.status(404).send("Endpoint not found");
});

export default router;
