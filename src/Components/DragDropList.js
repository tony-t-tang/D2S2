import '../Assets/Styles/DragDropList.css';
import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import Icon from './Icon';
import ICONS from '../Data/ICONS.json';
import { v4 as uuidv4 } from 'uuid';

function getStyles() {
	return {
		position: 'relative',
	};
}

export default function DragDropList() {
	const [search, setSearch] = useState('');

	const handleChange = (e) => {
		setSearch(e.target.value);
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
				{ICONS.filter((icon) => {
					if (search === '') {
						return icon;
					} else {
						for (let i = 0; i < icon.name.length; i++) {
							if (
								icon.name[i]
									.toLowerCase()
									.includes(search.toLowerCase())
							) {
								return icon;
							}
						}
					}
					return undefined;
				}).map((icon) => {
					return (
						<Grid
							item
							xs={6}
						>
							<Icon
								uuid={uuidv4()}
								id={icon.id}
								src={icon.src}
								name={icon.name}
								style={getStyles()}
							/>
							<p>{icon.name[0]}</p>
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
}
