import React, { useState } from 'react';
import JSONDATA from '../Data/ICONSOG.json';
import '../Assets/Styles/Searchbar.css';

//Search Bar
const Search = () => {
	const [searchInput, setSearchInput] = useState('');

	//Takes input from
	const handleChange = (e) => {
		e.preventDefault();
		setSearchInput(e.target.value);
		console.log(e.target.value);
	};

	return (
		<div className='search-bar'>
			<div>
				<input
					type='search'
					placeholder='Search...'
				/>
			</div>
		</div>
	);
};

export default Search;
