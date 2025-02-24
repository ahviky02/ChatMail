import express from "express";
import { login, logout, signup, updateProfile,googleSignup, checkAuth } from "../controllers/auth.controller.js";
import { protectRoutes } from '../middleware/auth.middleware.js';

const router = express.Router();

// User authentication routes
router.post("/signup", signup);
router.post("/google-signup", googleSignup);
router.post("/login", login);
router.post("/logout", logout);

// Protected routes
// router.put("/update-profile", protectRoutes, updateProfile);
router.put("/update",protectRoutes, updateProfile);
router.get("/check", protectRoutes, checkAuth);

export default router;