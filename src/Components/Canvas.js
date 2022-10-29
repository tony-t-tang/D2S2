import '../Assets/Styles/Canvas.css';
import { useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { Box } from '@mui/material';
import update from 'immutability-helper';
import DraggableIcon from './DraggableIcon';

export default function Canvas() {
	const [canvas, setCanvas] = useState([]);

	//Updates the icon's position
	const moveIcon = useCallback(
		(id, left, top) => {
			setCanvas(
				update(canvas, {
					[id]: {
						$merge: { left: left, top: top },
					},
				})
			);
		},
		[canvas]
	);

	//Command for when user drops icon onto canvas
	const [, drop] = useDrop(
		() => ({
			accept: 'image',
			drop: (item, monitor) => {
				const delta = monitor.getDifferenceFromInitialOffset();
				const iconList = canvas.filter((icon) => item.id === icon.id);

				if (iconList.length < 1) {
					setCanvas((canvas) => [...canvas, item]);
				}

				let left = Math.round(item.left + delta.x);
				let top = Math.round(item.top + delta.y);

				console.log(canvas);

				moveIcon(item.id, left, top);

				return undefined;
			},
		}),
		[canvas]
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
			{canvas.map((item) => {
				return (
					<DraggableIcon
						id={item.id}
						src={item.src}
						left={item.left}
						top={item.top}
					/>
				);
			})}
		</Box>
	);
}
