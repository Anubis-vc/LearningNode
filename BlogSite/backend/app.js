// TODO: add books to db, allow logged in users to post.
// create view in backend
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.port || 3000;

app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true // allow cookies to send with request
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.get("/", (req, res) => {
	res.send("Hello Worold");
})

app.listen(PORT, () => console.log(`listening on ${PORT}`))