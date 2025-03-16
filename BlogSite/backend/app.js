require("dotenv").config();
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');


const app = express();
const PORT = process.env.port || 3000;

app.use(express.urlencoded( { extended: true }));
app.use(express.json());

app.use('/api', apiRoutes);

app.get("/", (req, res) => {
	res.send("Hello Worold");
})

app.listen(PORT, () => console.log(`listening on ${PORT}`))