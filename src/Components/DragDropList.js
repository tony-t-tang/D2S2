import '../Assets/Styles/DragDropList.css';
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
	const [search, setSearch] = useState('');

	const handleChange = (e) => {
		setSearch(e.target.value);
		console.log(e.target.value);
	};

	return (
		<Box
			className='box-frame'
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
				className='icons-grid'
				container
				spacing={2}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				{ICONS.filter((picture) => {
					if (search === '') {
						return picture;
					} else {
						for(let i = 0; i < picture.name.length; i++) 
						{
							if(picture.name[i].toLowerCase().includes(search.toLowerCase()))
							{
								return picture;
							}
						}
					}
				}).map((picture, key) => {
					return (
						<Grid
							item
							xs={6}
						>
							<Icon
								id={picture.id}
								src={picture.src}
								style={getStyles()}
								key={key}
							/>
							<p>
								{picture.name[0]}
							</p>
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
}
