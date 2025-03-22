const { Router } = require('express');
const apiController = require('../controllers/apiController');
const apiRouter = Router();

apiRouter.get('/posts', apiController.getPosts);
apiRouter.post('/posts', apiController.addPost);

apiRouter.get('/posts/:id', apiController.getPost);
apiRouter.put('/posts/:id', apiController.updatePost);
apiRouter.delete('/posts/:id', apiController.deletePost);

apiRouter.post('/posts/comments/', apiController.addComment);
apiRouter.delete('/posts/comments/:id', apiController.deleteComment);

module.exports = apiRouter;