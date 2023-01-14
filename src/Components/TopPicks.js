import React, { useState, useEffect, useContext } from 'react';
import '../Assets/Styles/TopPicks.css';
import { Box, Grid } from '@mui/material';
import { CanvasContext } from '../App';
import axios from 'axios';

const style = {
	width: 300,
	height: 565,
	backgroundColor: '#D9D9D9',
	border: 1,
	overflow: 'scroll',
	overflowX: 'hidden',
	'&:hover': { overflow: 'visible' },
};

const titleStyle = {
	paddingBottom: '20px',
};

export default function TopPicks() {
	const [topPicks, setTopPicks] = useState([]);
	const { actions, state } = useContext(CanvasContext);

	useEffect(() => {
		// let elements = [];

		// for (let i = 0; i < state.canvas.length; i++) {
		// 	let data = [
		// 		state.canvas[i].position.left,
		// 		state.canvas[i].position.top,
		// 		parseInt(state.canvas[i].dimension.width),
		// 		parseInt(state.canvas[i].dimension.height),
		// 		state.canvas[i].content,
		// 	];

		// 	elements.push(data);
		// }

		const headers = {
			headers: {
				canvasWidth: 500,
				canvasHeight: 565,
				elements: [[100, 0, 20, 20, 15, '']],
			},
		};

		const url = 'http://pixeltoapp.com/getTopPicks';

		console.log(headers);
		console.log(elements);

		axios
			.get(url, {
				headers,
			})
			.then((response) => {
				setTopPicks(response);
			});
	}, [state.canvas]);

	return (
		<Box
			sx={style}
			className='container'
		>
			<div style={titleStyle}>Top Picks</div>
			<Grid
				container
				spacing={1}
				columns={2}
				sx={{ overflow: 'visible !important' }}
			>
				{topPicks.map((picks) => {
					return (
						<Grid
							item
							sx={8}
							spacing={1}
						>
							<img
								className={'image'}
								src={`https://ricoimage.s3.us-east-2.amazonaws.com/OnlyImage/${picks}.jpg`}
								alt=''
							></img>
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
}
