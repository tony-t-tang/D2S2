import '../Assets/Styles/Canvas.css';
import { useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { Box } from '@mui/material';
import update from 'immutability-helper';
import DraggableIcon from './DraggableIcon';

function getStyles(left, top, isDragging) {
	const transform = `translate3d(${left}px, ${top}px, 0)`;
	return {
		position: 'absolute',
		transform,
		WebkitTransform: transform,
		opacity: isDragging ? 0 : 1,
		height: isDragging ? 0 : '',
	};
}

export default function Canvas() {
	let PictureList = require('../Data/PictureList.json');
	const [canvas, setCanvas] = useState([]);

	//Allows user to move icons that are placed on canvas
	const moveIcon = useCallback(
		(id, left, top) => {
			setCanvas(
				update(canvas, {
					[id]: {
						$merge: { left, top },
					},
				})
			);
		},
		[canvas]
	);

	//Adds icon to canvas array
	const addIconToCanvas = (id) => {
		const iconList = PictureList.filter((picture) => id === picture.id);
		setCanvas((canvas) => [...canvas, iconList[0]]);
	};

	//Command for when user drops icon onto canvas
	const [, drop] = useDrop(
		() => ({
			accept: 'image',
			drop: (item, monitor) => {
				const delta = monitor.getDifferenceFromInitialOffset();

				let left = window.event.clientX - window.event.target.offsetLeft;
				// Math.round(item.left + delta.x);
				let top = window.event.clientY - window.event.target.offsetTop;
					
						//Math.round(item.top + delta.y);

				console.log(item);

				addIconToCanvas(item.id);
				moveIcon(item.id, left, top);

				return undefined;
			},
		}),
		[moveIcon]
	);

	return (
		<Box
			ref={drop}
			sx={{
				width: 500,
				height: 565,
				backgroundColor: '#D9D9D9',
				border: 1,
				position: 'relative',
			}}
		>
			<div>Canvas</div>
			{Object.keys(canvas).map((key) => (
				<DraggableIcon
					key={key}
					id={key}
					{...canvas[key]}
				/>
			))}
		</Box>
	);
}
