import '../Assets/Styles/Canvas.css';
import { CanvasContext } from '../App';
import { useContext } from 'react';
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

	const [, drop] = useDrop(
		() => ({
			accept: 'image',
			drop: (item) => {
				actions.addElement('IMAGE', item.src);
				return undefined;
			},
		}),
		[state.canvas]
	);

	return (
		<Box
			ref={drop}
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
