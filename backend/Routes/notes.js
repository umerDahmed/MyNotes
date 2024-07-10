const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/getUser");
const Note = require("../Models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get All the Notes using: GET "/api/auth/getuser". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
	try {
		const notes = await Note.find({ user: req.user.id });
		res.json(notes);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
});

// ROUTE 2: Add a new Note using: POST "/api/auth/addnote". Login required
router.post(
	"/addnote",
	fetchuser,
	[
		body("title", "Enter a valid title").isLength({ min: 3 }),
		body("description", "Description must be atleast 5 characters").isLength({
			min: 5,
		}),
	],
	async (req, res) => {
		try {
			const { title, description, tag } = req.body;
			console.log(req.body);
			// If there are errors, return Bad request and the errors
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			const note = new Note({
				title,
				description,
				tag,
				user: req.user.id,
			});
			const savedNote = await note.save();
			res.json(savedNote);
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error");
		}
	}
);

// ROUTE 3 : delete a Note using: PUT "/api/auth/addnote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
	try {
		let newNote = {};
		const { title, description, tag } = req.body;
		if (title) newNote.title = title;
		if (description) newNote.description = description;
		if (tag) newNote.tag = tag;

		let note = await Note.findById(req.params.id);
		if (!note) return res.status(404).send("note not found");
		if (req.user.id !== note.user.toString())
			return res.status(401).send("Not allowed to update");

		note = await Note.findByIdAndUpdate(
			req.params.id,
			{ $set: newNote },
			{ new: true }
		);
		res.json(note);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
});

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
	try {
		let note = await Note.findById(req.params.id);
		if (!note) return res.status(404).send("note not found");
		if (req.user.id !== note.user.toString())
			return res.status(401).send("Not allowed to delete");

		note = await Note.findByIdAndDelete(req.params.id);
		res.json("note deleted successfully");
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
});

module.exports = router;
