import '../Assets/Styles/Canvas.css';
import { CanvasContext } from '../App';
import { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { Box, Typography } from '@mui/material';
import CanvasComponent from './CanvasComponent';

const style = {
	width: '45vh',
	height: 605,
	backgroundColor: 'white',
	position: 'relative',
	borderRadius: '14px',
	mt: '1vh'
};

export default function Canvas() {
	const { actions, state } = useContext(CanvasContext);

	const [, drop] = useDrop(
		() => ({
			accept: 'image',
			drop: (item) => {
				actions.addElement('IMAGE', item.src);
				console.log(state.canvas)
				return undefined;
			},
		}),
		[state.canvas]
	);

	return (
		<Box
			alignItems='center'
			justifyItems='center'
		>
			<Typography
				color='white'
				fontSize='20px'
			>
				Canvas
			</Typography>
			<Box
				ref={drop}
				sx={style}
				id='container'
			>
				{state.canvas.map((canvas) => {
					return <CanvasComponent {...canvas} />;
				})}
			</Box>
		</Box>
	);
}
