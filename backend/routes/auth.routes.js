import express from "express";
import { login, logout, signup, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoutes } from '../middleware/auth.middleware.js';

const router = express.Router();

// User authentication routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Protected routes
router.put("/update-profile", protectRoutes, updateProfile);
router.get("/check", protectRoutes, checkAuth);

export default router;