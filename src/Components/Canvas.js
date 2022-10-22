import '../Assets/Styles/Canvas.css';
import { useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { Box } from '@mui/material';
import update from 'immutability-helper'
import Icon from './Icon';

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

	const addIconToCanvas = (id) => {
		console.log("meow")
		console.log(canvas)
		const iconList = PictureList.filter((picture) => id === picture.id);
		setCanvas((canvas) => [...canvas, iconList[0]]);
	};

	const [, drop] = useDrop(
		() => ({
			accept: 'image',
			drop: (item, monitor) => {
				const delta = monitor.getDifferenceFromInitialOffset();

				let left = Math.round(item.left + delta.x);
				let top = Math.round(item.top + delta.y);

				console.log(item)
		
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
				position: 'relative'
			}}
		>
			<div>Canvas</div>
			{Object.keys(canvas).map((key) => (
				<Icon
					key={key}
					id={key}
					{...canvas[key]}
				/>
			))}
		</Box>
	);
}
