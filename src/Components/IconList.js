import '../Assets/Styles/IconList.css';
import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import Icon from './Icon';
import ICONS from '../Data/Icons.json';
import { motion } from 'framer-motion';

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
				minWidth: '200px',
				width: '25%',
				height: '20%',
				backgroundColor: 'white',
				borderRadius: '14px',
				mt: '11vh'
			}}
		>
			<div className='search-bar'>
				<ImageSearchIcon 
					fontSize='medium'
					sx={{mb: '-5px'}}
				/>
				<input
					className='search'
					type='search'
					placeholder='Search...'
					tabIndex={-1}
					onChange={handleChange}
				/>
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
							component={motion.div}
							layout
							xs={6}
							key={icon.src}
						>
							<Icon
								component={motion.div}
								layout
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
