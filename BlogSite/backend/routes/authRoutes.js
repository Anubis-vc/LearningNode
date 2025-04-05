const { Router } = require('express');
const authController = require('../controllers/authController')
const authenticateToken = require('../middleware/authMiddleware');
const rateLimit = require('express-rate-limit');
const authRouter = Router();

const strictLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 5,
	message: { error: "Too many login attempts, try again later." }
});

authRouter.post('/login', strictLimiter, authController.login);
authRouter.post('/admin', authController.admin);
authRouter.post('/newuser', authController.newUser);

authRouter.get('/logout', authController.logout);
authRouter.get('/me', authenticateToken, authController.getMe);

authRouter.delete('/account', authenticateToken, authController.deleteAccount);

module.exports = authRouter;