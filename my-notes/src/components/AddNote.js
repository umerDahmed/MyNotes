import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
const AddNote = () => {
	const context = useContext(noteContext);
	const { addNote } = context;
	const [note, setNote] = useState({ title: "", description: "", tag: "" });

	const onClick = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		addNote(note.title, note.description, note.tag);
	};
	return (
		<div>
			<div className='container my-3'>
				<h2>Add a Note</h2>
				<form className='my-3'>
					<div className='mb-3'>
						<label htmlFor='title' className='form-label'>
							Title
						</label>
						<input
							type='text'
							className='form-control'
							id='title'
							name='title'
							onChange={onClick}
						/>
					</div>
					<div className='mb-3'>
						<label htmlFor='description' className='form-label'>
							description
						</label>
						<input
							type='text'
							className='form-control'
							id='description'
							name='description'
							onChange={onClick}
						/>
					</div>
					<div className='mb-3'>
						<label htmlFor='tag' className='form-label'>
							tag
						</label>
						<input
							type='text'
							className='form-control'
							id='tag'
							onChange={onClick}
						/>
					</div>
					<button type='submit' className='btn btn-primary' onClick={onSubmit}>
						Add Note
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddNote;
