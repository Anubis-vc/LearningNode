require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.port || 3000;

const limit = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 10,
	message: { error: "Too many attempts, try again later" }
})

app.use(express.urlencoded( { extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.get("/", (req, res) => {
	res.send("Hello Worold");
})

app.listen(PORT, () => console.log(`listening on ${PORT}`))