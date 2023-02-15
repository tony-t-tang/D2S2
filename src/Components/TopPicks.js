import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import parse from 'html-react-parser';
import React, { useContext, useEffect, useState } from 'react';
import GridLoader from 'react-spinners/GridLoader';
import { CanvasContext } from '../App';
import '../Assets/Styles/TopPicks.css';
import Picture from '../Components/Picture';

const override = {
	display: 'flex',
	margin: '20% auto 10%',
};

const style = {
	height: '100vh',
	width: '100%',
	backgroundColor: 'white',
	overflow: 'scroll',
	overflowX: 'hidden',
	mt: '-1.9vh',
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
			if (state.canvas.length === 0) {
				setTopPicks([]);
				setLoading(false);
			} else {
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
					canvasHeight: JSON.stringify(
						state.canvasRef.current.clientHeight
					),
					canvasWidth: JSON.stringify(
						state.canvasRef.current.clientWidth
					),
					elements: JSON.stringify(elements),
				};
				const url = 'http://pixeltoapp.com/getTopPicks/';

				console.log(headers);
				axios
					.get(url, {
						headers,
					})
					.then((response) => {
						let data = [];

						for (let i = 0; i < 100; i++) {
							data.push(response.data[i]);
						}

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
					fontSize='2vw'
				>
					Top Picks
				</Typography>
				{loading ? (
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							height:'80%',
							justifyContent: 'center',
							alignContent: 'center',
						}}
					>
						<GridLoader
							loading={loading}
							cssOverride={override}
							size={'3vw'}
						/>
						<Typography
							textAlign='center'
							fontSize='2vw'
						>
							Searching . . .
						</Typography>
					</Box>
				) : (
					<AnimatePresence>
						<Grid
							container
							justifyContent={'center'}
							alignItems='center'
							spacing={1}
							columns={2}
						>
							{topPicks.map((picks) => {
								return (
									<Grid
										component={motion.div}
										layout
										key={picks}
										item
									>
										<Picture
											component={motion.div}
											layout
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
