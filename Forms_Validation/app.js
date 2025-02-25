const express = require("express");
const usersRouter = require("./routes/usersRouter");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", usersRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));