const db = require('../db/queries');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { NotFoundError } = require('../errors/errors');

async function tester(req, res) {
	const { username } = req.params;
	console.log(username)
	
	try {
		const count = await db.deleteUser(username);
		if (count == 0) {
			res.send("count returned 0");
		}
		else {
			res.send("count");
		}
	} catch(err) {
		if (err instanceof NotFoundError) {
			return res.send("It's not found");
		}
			res.send("It's something else");
	}
}

async function login(req, res) {
	const { username, password } = req.body;
	try {
		const user = await db.getUser(username);
		if(!user || user.length == 0) {
			return res.status(401).json({ error: `Invalid username or password` })
		}

		const validate = await bcrypt.compare(password, user[0].password);
		if (!validate) {
			return res.status(401).json({ error: `Invalid username or password` })
		}

		const accessToken = jwt.sign(
            { username: user[0].username }, 
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

		res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
			path: "/",
        });

		res.json({ message: "login successful" })

	} catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function admin(req, res) {
	const { username, password } = req.body;
	try {
		const user = await db.getUser(username);
		if (user.length == 0 || !user[0].isAdmin) {
			return res.status(401).json({ error: `Must be admin to access` });
		}

		const validate = await bcrypt.compare(password, user[0].password);
		if (!validate) {
			return res.status(401).json({ error: `Invalid username or password` });
		}

		const accessToken = jwt.sign(
            { username: user.username }, 
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

		res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
			path: "/",
        });
		
		res.json({ message: `login successful` });

	} catch(err) {
		res.status(500).json({ error: err.message });
	}
}

async function newUser(req, res) {
	const { username, email, password } = req.body;

	try {
		const checkUser = await db.getUser(username);
		if (checkUser.length > 0) {
			return res.status(409).json({ error: `username already taken` });
		}
		const checkEmail = await db.checkEmail(email);
		if (Number(checkEmail) > 0) {
			return res.status(409).json({ error: `email already exists` });
		}

		const securePass = await bcrypt.hash(password, 10);
		const user = await db.addUser(username, securePass, email);

		const accessToken = jwt.sign(
            { username: user.username }, 
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
		res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
			path: "/",
        });
		
		res.status(201).json({ accessToken });
	} catch(err) {
		res.status(500).json({ error: err.message });
	}
}

async function deleteAccount(req, res) {
	const { username, password } = req.body;
	if (!username) {
		return res.status(400).json({ error: `Invalid or missing username` })
	}
	try {
		const user = await db.getUser(username)
		if (!user || user.length == 0) {
			return res.status(404).json( {error: `No associated user` })
		}

		const validate = await bcrypt.compare(password, user[0].password);
		if (validate) {
			const deletedUser = await db.deleteUser(username);
			res.clearCookie("accessToken", {
				httpOnly: true,
				sameSite: "none",
				secure: true,
				path: "/",
			});
			res.status(200).json({ message: "User deleted successfully", deletedUser });
		}
		else {
			res.status(401).json({ erro: "Invalid username or password" });
		}

	} catch (err) {
		if (err instanceof NotFoundError) {
			return res.status(err.statusCode).json({ error: err.message });
		}
		res.status(500).json({ error: err.message });
	}
}

async function logout (req, res) {
	res.clearCookie("accessToken", {
		httpOnly: true,
		sameSite: "none",
		secure: true,
		path: "/",
	});
	
	res.json({ message: "Logged out successfully" });
}

module.exports = {
	login,
	admin,
	newUser,
	deleteAccount,
	logout,
	tester,
}