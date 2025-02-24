import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../form.css";
const Signup = () => {
	const [credentials, setCredentials] = useState({
		name: "",
		email: "",
		password: "",
		cpassword: "",
	});
	let history = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { name, email, password, cpassword } = credentials;

		if (password !== cpassword) {
			alert("password incorrect");
		} else {
			const response = await fetch(
				"http://localhost:5000/api/auth/createuser",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name,
						email,
						password,
					}),
				}
			);
			const json = await response.json();
			localStorage.setItem("token", json.Authtoken);
			history("/Home");
		}
	};

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};
	return (
		<div className='classNameborder border-dark a p-5 '>
			<h2 className='b'> My memories</h2>
			<form onSubmit={handleSubmit}>
				<div className='mb-3 '>
					<label htmlFor='name' className='form-label'>
						name
					</label>
					<input
						type='text'
						className='form-control'
						value={credentials.name}
						onChange={onChange}
						id='name'
						name='name'
						aria-describedby='emailHelp'
					/>
				</div>
				<div className='mb-3 '>
					<label htmlFor='email' className='form-label'>
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
				</div>
				<div className='mb-3'>
					<label htmlFor='password' className='form-label'>
						Password
					</label>
					<input
						type='password'
						className='form-control'
						value={credentials.password}
						onChange={onChange}
						name='password'
						id='password'
						minLength={5}
						required
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='password' className='form-label'>
						confirm password
					</label>
					<input
						type='password'
						className='form-control'
						value={credentials.cpassword}
						onChange={onChange}
						name='cpassword'
						id='cpassword'
						minLength={5}
						required
					/>
				</div>
				<button type='submit' className='btn btn-primary w-100 '>
					Signup
				</button>
				<div className='m-3'>
					Already have an account ? <Link to='/Login'>click here </Link> to
					login to your account
				</div>
			</form>
		</div>
	);
};

export default Signup;
