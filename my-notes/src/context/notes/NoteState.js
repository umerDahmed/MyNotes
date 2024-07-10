import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
	const host = "http://localhost:5000";
	const notesInitial = [];
	const [notes, setNotes] = useState(notesInitial);
	const fetchNotes = async () => {
		const response = await fetch(`${host}/api/notes/fetchallnotes`, {
			method: "GET",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
		});
		const json = await response.json();
		console.log(json);
		setNotes(json);
	};

	// add a note
	const addNote = async (title, description, tag) => {
		console.log(localStorage.getItem("token"));
		const response = await fetch(`${host}/api/notes/addnote`, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({ title, description, tag }),
		});
		const json = await response.json();
		setNotes(notes.concat(json));
	};
	// delete a note
	const deleteNote = async (id) => {
		// http://localhost:5000/api/notes/deletenote/652381342503ac660408fc32
		await fetch(`${host}/api/notes/deletenote/${id}`, {
			method: "DELETE",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
		});
		const NewNotes = notes.filter((note) => {
			return note._id !== id;
		});
		setNotes(NewNotes);
	};
	//edit a note
	const editNote = async (id, title, description, tag) => {
		console.log(id);
		const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({ title, description, tag }),
		});
		let newNotes = JSON.parse(JSON.stringify(notes));

		for (let index = 0; index < newNotes.length; index++) {
			const element = newNotes[index];
			if (element._id === id) {
				newNotes[index].title = title;
				newNotes[index].description = description;
				newNotes[index].tag = tag;
				break;
			}
		}
		setNotes(newNotes);
	};
	return (
		<noteContext.Provider
			key={setNotes}
			value={{ notes, setNotes, addNote, deleteNote, editNote, fetchNotes }}
		>
			{props.children}
		</noteContext.Provider>
	);
};

export default NoteState;
