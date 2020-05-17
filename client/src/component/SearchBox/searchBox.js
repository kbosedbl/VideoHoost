import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './searchBox.css';

const SearchBox = ({searchfield,searchChange}) => {
	return (
			<div className="input-group md-form form-sm form-2 pl-0">
			  <input className="form-control my-0 py-1 red-border" type="text" placeholder="Search" aria-label="Search" onChange={searchChange}/>
			  <div className="input-group-append">
			    <span className="input-group-texti red lighten-3" id="basic-text1">
			    	<FontAwesomeIcon icon={faSearch} />
		        </span>
			  </div>
			</div>
		);
}

export default SearchBox;