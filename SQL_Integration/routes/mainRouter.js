const { Router } = require("express");
const mainController = require("../controllers/mainController");

const mainRouter = Router();

mainRouter.get("/new", mainController.newUserGet);
mainRouter.post("/new", mainController.newUserPost);
mainRouter.get("/", mainController.usersGet);

module.exports = mainRouter;