import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
const Notes = () => {
	const context = useContext(noteContext);
	const history = useNavigate();
	const { notes, editNote } = context;
	const ref = useRef(null);
	const [note, setNote] = useState({
		id: null,
		etitle: "",
		edescription: "",
		etag: "",
	});
	const { fetchNotes } = context;
	useEffect(() => {
		if (localStorage.getItem("token")) fetchNotes();
		else history("/Home");
		//eslint-disable-next-line
	}, []);

	const updateNote = (currentNote) => {
		setNote({
			id: currentNote._id,
			etitle: currentNote.title,
			edescription: currentNote.description,
			etag: currentNote.tag,
		});
	};
	const handleClick = (e) => {
		e.preventDefault();
		editNote(note.id, note.etitle, note.edescription, note.etag);
		ref.current.click();
	};

	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};
	return (
		<>
			<AddNote />
			<div
				className='modal fade'
				id='exampleModal'
				tabIndex='-1'
				aria-labelledby='exampleModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='exampleModalLabel'>
								Edit Note
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>
							<form className='my-3'>
								<div className='mb-3'>
									<label htmlFor='title' className='form-label'>
										Title
									</label>
									<input
										type='text'
										className='form-control'
										id='etitle'
										name='etitle'
										value={note.etitle}
										aria-describedby='emailHelp'
										onChange={onChange}
									/>
								</div>
								<div className='mb-3'>
									<label htmlFor='description' className='form-label'>
										Description
									</label>
									<input
										type='text'
										className='form-control'
										id='edescription'
										name='edescription'
										value={note.edescription}
										onChange={onChange}
									/>
								</div>
								<div className='mb-3'>
									<label htmlFor='tag' className='form-label'>
										Tag
									</label>
									<input
										type='text'
										className='form-control'
										id='etag'
										name='etag'
										value={note.etag}
										onChange={onChange}
									/>
								</div>
							</form>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-secondary'
								data-bs-dismiss='modal'
								ref={ref}
							>
								Close
							</button>
							<button
								onClick={handleClick}
								type='button'
								className='btn btn-primary'
							>
								Update Note
							</button>
						</div>
					</div>
				</div>
			</div>

			<h2> You Notes</h2>
			<div className='row my-3'>
				{notes.map((note) => {
					return <Noteitem updateNote={updateNote} note={note} />;
				})}
			</div>
		</>
	);
};
// const Notes = () => {
// 	const context = useContext(noteContext);
// 	const { notes, addNote } = context;
// 	return (
// 		<>
// 			<AddNote />
// 			<div className='row my-3'>
// 				<h2>You Notes</h2>
// 				{notes.map((note) => {
// 					return <Noteitem key={note._id} note={note} />;
// 				})}
// 			</div>
// 		</>
// 	);
// };
export default Notes;
