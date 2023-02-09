import '../Assets/Styles/Canvas.css';
import { CanvasContext } from '../App';
import { useContext, useRef } from 'react';
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
	const canvasRef = useRef(null);

	const [, drop] = useDrop(
		() => ({
			accept: 'image',
			hover: (item, monitor) => {
				const offset = monitor.getSourceClientOffset();
				const rect = canvasRef.current.getBoundingClientRect();

				state.mouseRef.current = {
					x: offset.x - rect.left,
					y: offset.y - rect.top,
				};
			},
			drop: (item) => {
				actions.addElement(
					'IMAGE',
					item.src,
					state.mouseRef.current.y,
					state.mouseRef.current.x
				);

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
				fontSize='30px'
			>
				Canvas
			</Typography>
			<Box
				ref={(el) => {
					drop(el);
					canvasRef.current = el;
				}}
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
