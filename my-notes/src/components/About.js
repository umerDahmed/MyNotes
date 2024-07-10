import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
const About = () => {
	let temp = useContext(noteContext);
	return (
		<>
			<div>
				<h2>Uses of Notes</h2>
				<p>
					Notes are essential for a variety of reasons. They serve as a reliable
					record of information, helping us remember and recall important
					details, whether it's in a classroom, a business meeting, or while
					studying. Notes provide a structured way to organize thoughts, ideas,
					and data, facilitating better comprehension and analysis. They also
					promote active listening and engagement during discussions, as we pay
					closer attention to extract key points. Furthermore, notes act as a
					valuable reference for future tasks, decision-making, or sharing
					knowledge with others. Whether in the analog form of handwritten notes
					or digital formats, taking notes is a fundamental tool for learning,
					communication, and information management.
				</p>
				<p>
					Admin : Umer Ahmed <br />
					contact : +91 9949385723
				</p>
			</div>
		</>
	);
};

export default About;
