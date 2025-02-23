const { Router } = require("express");
const messages = require("../db");

const indexRouter = Router();

indexRouter.get("/", (req, res) => res.render("index", { messages: messages }));
indexRouter.get("/*", (req, res) => res.status(404).send("Error 404 cannot find site"))

module.exports = indexRouter;