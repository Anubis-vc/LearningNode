const { Router } = require('express');
const authController = require('../controllers/authController')
const authenticateToken = require('../middleware/authMiddleware');
const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/admin', authController.admin);
authRouter.post('/newuser', authController.newUser);

authRouter.get('/logout', authController.logout);
authRouter.get('/me', authenticateToken, authController.getMe);

authRouter.delete('/account', authenticateToken, authController.deleteAccount);

module.exports = authRouter;