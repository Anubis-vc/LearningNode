const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
	res.json({
		message: "Hello World"
	});
});
app.post('/api/posts', verifyToken, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (err) {
			res.sendStatus(403);
		}
		else {
			res.json({
				message: 'post created',
				authData: authData
			});
		}
	})
	
});
app.post('/api/login', (req, res) => {
	// fake user
	const user = {
		id: 1,
		username: "Dave",
		email: "dave@gmail.com"
	}

	jwt.sign({ user: user }, 'secretKey', { expiresIn: '30s' }, (err, token) => {
		res.json({
			token: token
		})
	});
})

// FORMAT OF TOKEN:
// Authorization: bearer <access token>

function verifyToken (req, res, next) {
	// get auth header value
	const bearerHeader = req.headers['authorization']
	if(bearerHeader) {
		const bearerToken = bearerHeader.split(' ')[1];
		req.token = bearerToken;
		next();
	}
	else {
		// forbidden
		res.sendStatus(403);
	}
}

app.listen(3000, () => console.log("Listening on 3000"));