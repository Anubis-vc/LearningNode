const express = require("express");
const path = require("path");
const app = express();

console.log("__dirname:", __dirname);

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/about", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "about.html"));
});
app.get("/contact-me", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "contact-me.html"));
});

app.use((req, res) => {
	res.status(404).sendFile(path.join(__dirname, "public", "about.html"));
})

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`First Express App - listening on port ${PORT}`);
})