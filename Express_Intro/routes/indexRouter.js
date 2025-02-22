const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", (req, res) => res.send("Reached index page"));
indexRouter.get("/*", (req, res) => res.status(404).send("404, page not found"));

module.exports = indexRouter;