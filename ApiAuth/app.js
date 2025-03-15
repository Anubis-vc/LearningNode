const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
	res.json({
		message: "Hello World"
	});
});

app.listen(3000, () => console.log("Listening on 3000"));