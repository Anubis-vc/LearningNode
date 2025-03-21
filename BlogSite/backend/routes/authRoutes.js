const { Router } = require('express');
const authController = require('../controllers/authController')
const authenticateToken = require('../middleware/authMiddleware');
const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/admin', authController.admin);
authRouter.post('/newuser', authController.newUser);

authRouter.get('/logout', authController.logout);

authRouter.delete('/account', authenticateToken, authController.deleteAccount);

authRouter.get('/tester/:username', authController.tester);

module.exports = authRouter;