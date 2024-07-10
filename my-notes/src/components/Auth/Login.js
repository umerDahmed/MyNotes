import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../form.css";
const Login = (props) => {
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	let history = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch("http://localhost:5000/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: credentials.email,
				password: credentials.password,
			}),
		});
		const json = await response.json();
		console.log(json);
		if (json.success === true) {
			console.log(json.AuthToken);
			localStorage.setItem("token", json.AuthToken);
			history("/Home");
		} else {
			if (json.error) alert(json.error);
			else alert("Enter valid credentials");
		}
	};

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	return (
		<div className='border border-dark a p-5'>
			<form onSubmit={handleSubmit}>
				<h2 className='b'> My memories</h2>
				<div className='mb-3'>
					<label htmlFor='email' className='form-label font-weight-bold'>
						Email address
					</label>
					<input
						type='email'
						className='form-control'
						value={credentials.email}
						onChange={onChange}
						id='email'
						name='email'
						aria-describedby='emailHelp'
					/>
					<div id='emailHelp' className='form-text'>
						We'll never share your email with anyone else.
					</div>
				</div>
				<div className='mb-3'>
					<label htmlFor='password' className='form-label font-weight-bold'>
						Password
					</label>
					<input
						type='password'
						className='form-control'
						value={credentials.password}
						onChange={onChange}
						name='password'
						id='password'
					/>
				</div>
				<button type='submit' className='btn btn-primary w-100 '>
					Login
				</button>
				<div className='m-3'>
					Not have an account ? <Link to='/Signup'>click here </Link> to create
					an account
				</div>
			</form>
		</div>
	);
};

export default Login;
