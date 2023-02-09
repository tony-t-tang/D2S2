import { Box, Grid, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import parse from 'html-react-parser';
import React, { useContext, useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { CanvasContext } from '../App';
import '../Assets/Styles/TopPicks.css';
import Picture from '../Components/Picture';

const override = {
	display: 'block',
	margin: '40% auto',
	size: '100px',
};

const style = {
	minHeight: '100vh',
	backgroundColor: 'white',
	overflow: 'scroll',
	overflowX: 'hidden',
	ml: '4.5vh',
	mt: '-2vh',
	mr: '-8vh'
};

const titleStyle = {
	paddingBottom: '20px',
};

export default function TopPicks() {
	const [topPicks, setTopPicks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [timeoutID, setTimeoutID] = useState(null);
	const { state } = useContext(CanvasContext);

	useEffect(() => {
		if (timeoutID) {
			clearTimeout(timeoutID);
		}

		setLoading(true);

		const id = setTimeout(() => {
			if(state.canvas.length === 0) {
				setTopPicks([]);
				setLoading(false);
			}
			else {
				console.log('Fetching Top Picks');

				let elements = [];

				for (let i = 0; i < state.canvas.length; i++) {
					let data = [
						state.canvas[i].position.left,
						state.canvas[i].position.top,
						parseInt(state.canvas[i].dimension.width),
						parseInt(state.canvas[i].dimension.height),
						parseInt(
							state.canvas[i].src.slice(
								0,
								state.canvas[i].src.length - 4
							)
						),
						state.canvas[i].type === 'TEXT'
							? parse(state.canvas[i].content).props.children
							: '',
					];

					elements.push(data);
				}

				const headers = {
					canvasHeight: '565',
					canvasWidth: '500',
					elements: JSON.stringify(elements),
				};
				const url = 'http://pixeltoapp.com/getTopPicks/';

				console.log(headers);

				axios
					.get(url, {
						headers,
					})
					.then((response) => {
						console.log(response);

						let data = [];

						for (let i = 0; i < 100; i++) {
							data.push(response.data[i]);
						}

						console.log(data);
						setTopPicks(data);
						setLoading(false);
					});
			}
		}, 2000);

		setTimeoutID(id);

		return () => {
			clearTimeout(id);
		};
	}, [state.canvas]);

	return (
		<Box
			width='54%'
			marginBottom='4vh'
			marginTop='2vh'
		>
			<Box
				sx={style}
				className='container'
			>
				<Typography
					marginTop='.5%'
					color='black'
					textAlign='center'
					fontSize='20px'
				>
					Top Picks
				</Typography>
				{loading ? (
				<ClipLoader
					loading={loading}
					cssOverride={override}
					size={150}
				/>
			) : (
				<AnimatePresence>
					<Grid
						container
						marginLeft='2%'
						marginTop='.5%'
						alignItems='center'
						spacing={1}
						columns={2}
					>
						{topPicks.map((picks) => {
							return (
								<Grid
									key={picks}
									item
								>
									<Picture
										key={picks}
										src={picks}
									></Picture>
								</Grid>
							);
						})}
					</Grid>
				</AnimatePresence>
				)}
			</Box>
		</Box>
	);
}
