import express from 'express';
import { validateMiddleware } from '../middlewares/validate.middleware.js';
import { loginSchema, signupSchema } from '../validators/auth.validator.js';
import { getMe, login, signup, updateName, updatePassword } from '../controllers/auth.controllers.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

let router = express.Router();

router.post("/signup", validateMiddleware(signupSchema), signup);
router.post("/login", validateMiddleware(loginSchema), login);
router.get("/get-me", authMiddleware, getMe);

router.patch("/updateName", authMiddleware, updateName);
router.patch("/updatePassword", authMiddleware, updatePassword);

export default router;