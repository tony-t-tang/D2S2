import '../Assets/Styles/Canvas.css';
import { CanvasContext } from '../App';
import { useContext, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { Box } from '@mui/material';
import CanvasComponent from './CanvasComponent';

const style = {
	width: 500,
	height: 565,
	backgroundColor: '#D9D9D9',
	border: 1,
	position: 'relative',
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
			collect: (monitor) => monitor,
		}),
		[state.canvas, state.mouseRef.current]
	);

	return (
		<Box
			ref={(el) => {
				drop(el);
				canvasRef.current = el;
			}}
			sx={style}
			id='container'
		>
			<div>Canvas</div>
			{state.canvas.map((canvas) => {
				return <CanvasComponent {...canvas} />;
			})}
		</Box>
	);
}
