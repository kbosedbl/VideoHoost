import React from 'react';
import axios from 'axios';
import myUploads from './MyUploads/myUploads';
import './Button.css';
import { Link, Redirect } from 'react-router-dom';

const redirect = () =>
{
	window.location.reload();
}

const Button = ({ upload_title , uploader_name }) => {
	
	return(
			<div>
				<button type="button" className="btn btn-danger" onClick = {(video) => {
					console.log(uploader_name);
					console.log(upload_title);
					axios.post('/api/delete' , {
	        			uploader_name: uploader_name,
	        			upload_title: upload_title
	      			}).then(res => {
	        			console.log(res.data.deletedCount);
	        			redirect();      			     			
	      			});
				}}>Delete</button>								 
			</div>
		);
}

export default Button;