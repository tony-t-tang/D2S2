import '../Assets/Styles/DragDrop.css';
import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import Icon from './Icon';
import ICONS from '../Data/ICONS.json';

function getStyles() {
	return {
		position: 'relative',
	};
}

export default function DragDrop() {
	const [searchTerm, setSearchTerm] = useState('');

	//Takes input from search
	const handleChange = (e) => {
		e.preventDefault();
		setSearchTerm(e.target.value);
		console.log(e.target.value);
	};

	return (
		<Box
			className='InsideDragDrop'
			sx={{
				width: 200,
				height: 524,
				backgroundColor: '#D9D9D9',
				border: 2,
			}}
		>
			Drag & Drop
			<div className='search-bar'>
				<div>
					<input
						type='search'
						placeholder='Search...'
						onChange={handleChange}
					/>
				</div>
			</div>
			<Grid
				container
				spacing={2}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				{ICONS.map((picture) => {
					return (
						<Grid
							item
							xs={6}
						>
							<Icon
								id={picture.id}
								src={picture.src}
								left={-100}
								top={100}
								style={getStyles()}
							/>
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
}
