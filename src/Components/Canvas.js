import '../Assets/Styles/Canvas.css';
import { CanvasContext } from '../App';
import { useState, useContext } from 'react';
import { useDrop } from 'react-dnd';
import { Box } from '@mui/material';
import CanvasComponent from './CanvasComponent';
import { v4 as uuidv4 } from 'uuid';


const style = {
	width: 500,
	height: 565,
	backgroundColor: '#D9D9D9',
	border: 1,
	position: 'relative',
};

export default function Canvas() {
	const {state, actions} = useContext(CanvasContext)

	const [, drop] = useDrop(
		() => ({
			accept: 'image',
			drop: (item) => {
				const iconList = state.canvas.filter(
					(icon) => item.uuid === icon.uuid
				);

				if (iconList.length < 1) {
					actions.setCanvas([...state.canvas, item]);
				}

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
			{state.canvas.map((item) => {
				return (
					<CanvasComponent
						uuid={item.uuid}
						id={item.id}
						src={item.src}
						name={item.name}
						left={item.left}
						top={item.top}
					/>
				);
			})}
		</Box>
	);
}
