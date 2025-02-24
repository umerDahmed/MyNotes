const jwt = require("jsonwebtoken");
const JWT_SECRET = "asda";

const fetchUser = async (req, res, next) => {
	const token = await req.header("auth-token");
	if (!token)
		return res.status(401).json({ error: "Authenticate a valid token" });
	try {
		const data = jwt.verify(token, JWT_SECRET);
		req.user = data.user;
		next();
	} catch (error) {
		console.log(error);
		res.status(500).send("Some Error Occured");
	}
};

module.exports = fetchUser;
