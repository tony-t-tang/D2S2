import '../Assets/Styles/DragDropList.css';
import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import Icon from './Icon';
import ICONS from '../Data/Icons.json';

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
				width: 202,
				height: 525,
				backgroundColor: '#D9D9D9',
				border: 1,
			}}
		>
			Drag & Drop
			<div className='search-bar'>
				<div>
					<input
						type='search'
						placeholder='Search...'
						tabIndex={-1}
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
							key={icon.src}
						>
							<Icon
								src={icon.src}
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
