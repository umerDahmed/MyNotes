const express = require("express");
const bcrypt = require("bcrypt"); //using bcrpyt js for encrypting the password
const User = require("../Models/User"); //inserting schema
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/getUser");
const router = express.Router(); //routes is used for jumping to the endpoints
const JWT_SECRET = "asda";

// this is the post operation which is after api/auth... this will work at the endpoint /createuser.
router.post("/createuser", async (req, res) => {
	let success = false;
	// in this section , we are encrypting the password
	const salt = await bcrypt.genSalt(10);
	const secPass = await bcrypt.hash(req.body.password, salt);
	req.body.password = secPass;
	//

	const user = await User({
		name: req.body.name,
		email: req.body.email,
		password: secPass,
	}); // we are inserting data from request body(thunder client) into the User schema

	await user.save(); // used to save data into the dataBase
	const data = {
		user: {
			id: user.id,
		},
	};
	const AuthToken = jwt.sign(data, JWT_SECRET);
	success = true;
	res.json({ success, AuthToken });
});

//login Endpoint
router.post("/login", async (req, res) => {
	let success = false;
	const { email, password } = await User(req.body); //extracting the password from the front-end(or say request)
	try {
		const exists = await User.findOne({ email }); //checking if the email exists
		if (!exists) {
			success = false;
			return res
				.Status(400)
				.json({ success, error: "Enter a Valid login info" }); //if not..sending bad status
		}

		const PassCheck = await bcrypt.compare(password, exists.password); //checking if the password is correct
		if (!PassCheck) {
			success = false;
			return res.status(400).json({
				success,
				error: "Please try to login with correct credentials",
			});
		}

		const data = {
			user: {
				id: exists.id,
			},
		};
		const AuthToken = jwt.sign(data, JWT_SECRET); //making authToken to sned as a response
		success = true;
		return res.json({ success, AuthToken });
	} catch (error) {
		let success = false;
		res.status(400).json({ success, error: "Enter Valid credentials" });
	}
});

//get user info
router.post("/getuser", fetchUser, async (req, res) => {
	try {
		let user_id = await req.user.id; //getting the logged in user by fetchUser which makes use of token
		const temp = await User.findById(user_id).select("-password"); //getting the user by user_id
		return res.json({ temp }); //sending the response
	} catch (error) {
		console.log(error);
		res.status(500).send("Some Error Occured");
	}
});

module.exports = router;
