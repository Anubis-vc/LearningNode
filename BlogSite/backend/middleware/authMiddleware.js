const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
	const token = req.cookies.accessToken;
	
	if (!token) {
		return res.status(401).json({ error: "No access token" });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({ error: "Access denied" });
		}
		req.user = decoded;
		next()
	});
}

module.exports = authenticateToken;