const express = require("express");
const mainRouter = require("./routes/mainRouter");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", mainRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));