import '../Assets/Styles/Canvas.css';
import { CanvasContext } from '../App';
import { useContext, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Box, Typography } from '@mui/material';
import CanvasComponent from './CanvasComponent';

const style = {
	width: '25vw',
	height: '60vh',
	backgroundColor: 'white',
	position: 'relative',
	borderRadius: '14px',
	mt: '1vh',
};

export default function Canvas() {
	const { actions, state } = useContext(CanvasContext);

	const [, drop] = useDrop(
		() => ({
			accept: 'image',
			hover: (item, monitor) => {
				const offset = monitor.getSourceClientOffset();
				const rect = state.canvasRef.current.getBoundingClientRect();

				state.mouseRef.current = {
					x: offset.x - rect.left,
					y: offset.y - rect.top,
				};
			},
			drop: (item) => {
				actions.addElement(
					item.src,
					item.type,
					item.content,
					state.mouseRef.current.y,
					state.mouseRef.current.x
				);

				return undefined;
			},
			collect: (monitor) => monitor,
		}),
		[state.canvas, state.mouseRef.current]
	);

	return (
		<Box
			alignItems='center'
			justifyItems='center'
		>
			<Typography
				color='white'
				fontSize='2vw'
				textAlign='center'
				paddingTop='2vw'
			>
				Canvas
			</Typography>
			<Box
				ref={(el) => {
					drop(el);
					state.canvasRef.current = el;
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
