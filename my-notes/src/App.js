import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

function App() {
	return (
		<>
			<NoteState>
				<Navbar />
				<div className='container'>
					<Routes>
						<Route exact path='/' element={<Login />} />
						<Route exact path='/About' element={<About />} />
						<Route exact path='/Login' element={<Login />} />
						<Route exact path='/Home' element={<Home />} />
						<Route exact path='/Signup' element={<Signup />} />
						<Route path='*' element={<h1>Route does not exist</h1>} />
					</Routes>
				</div>
			</NoteState>
		</>
	);
}
export default App;
