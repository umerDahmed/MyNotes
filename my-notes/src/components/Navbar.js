import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
	const Location = useLocation();
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/Login");
	};
	return (
		<>
			{localStorage.getItem("token") ? (
				<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
					<Link className='navbar-brand' to='/'>
						Navbar
					</Link>
					<button
						className='navbar-toggler'
						type='button'
						data-toggle='collapse'
						data-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarSupportedContent'>
						<ul className='navbar-nav mr-auto'>
							<li
								className={`nav-item ${
									Location.pathname === "/" ? "active" : " "
								}`}
							>
								<Link className='nav-link' to='/Home'>
									Home <span className='sr-only'>(current)</span>
								</Link>
							</li>
							<li
								className={`nav-item ${
									Location.pathname === "/About" ? "active" : " "
								}`}
							>
								<Link className='nav-link' to='/About'>
									About
								</Link>
							</li>
						</ul>
						{!localStorage.getItem("token") ? (
							<form className='form-inline my-2 my-lg-0'>
								<Link
									className='btn btn-primary mx-1'
									to='/login'
									role='button'
								>
									Login
								</Link>
								<Link
									className='btn btn-primary mx-1'
									to='/signup'
									role='button'
								>
									Signup
								</Link>
							</form>
						) : (
							<button onClick={handleLogout} className='btn btn-success'>
								Logout
							</button>
						)}
					</div>
				</nav>
			) : (
				<h5></h5>
			)}
		</>
	);
};

export default Navbar;
