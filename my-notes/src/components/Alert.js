import React from "react";

const Alert = (props) => {
	return (
		<>
			console.log("asdk")
			<div class='alert alert-primary' role='alert'>
				<div className='alert alert-primary' role='alert'>
					{props.message}
				</div>
			</div>
		</>
	);
};
export default Alert;
