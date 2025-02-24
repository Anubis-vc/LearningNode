const express = require("express");
const path = require("node:path");
const indexRouter = require("./Routes/indexRouter")
const newRouter = require("./Routes/newRouter");
const messageRouter = require("./Routes/messageRouter");

const app = express();
const PORT = 3000;

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "Views"));
app.set("view engine", "ejs");

app.use("/new", newRouter);
app.use("/message", messageRouter);
app.use("/", indexRouter);

app.use((err, req, res, next) => {
	console.error(err);
	res.status(err.statusCode || 500).send(err);
});

app.listen(PORT, () => {
	console.log(`Messaage board app listening on port ${PORT}`);
});