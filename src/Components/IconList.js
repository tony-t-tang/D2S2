import '../Assets/Styles/IconList.css';
import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import Icon from './Icon';
import ICONS from '../Data/Icons.json';
import { motion } from 'framer-motion';

export default function DragDropList() {
	const [search, setSearch] = useState('');

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	return (
		<Box
			className='box-frame'
			sx={{
				width: '12vw',
				maxWidth: '100%',
				minHeight: '50%',
				height: '100vh',
				maxHeight: '20%',
				backgroundColor: 'white',
				borderRadius: '14px',
			}}
		>
			<div className='search-bar'>
				<ImageSearchIcon
					fontSize='medium'
					sx={{ mb: '-3%', width: '1.8vw', height: '1.2vw' }}
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
				columns={{ xs: 2, sm: 2, md: 6}}
				spacing={0}
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
							xs={2}
							sm={3}
							style={{ marginBottom: '4%' }}
							key={icon.src}
						>
							<Icon
								component={motion.div}
								layout
								src={icon.src}
								type={icon.type}
								content={icon.content}
							/>
							<Typography
								textAlign='center'
								fontSize='1vw'
							>
								{icon.name[0]}
							</Typography>
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
}
