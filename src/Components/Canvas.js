import '../Assets/Styles/Canvas.css';
import { useState, useCallback, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Box } from '@mui/material';
import update from 'immutability-helper';
import DraggableIcon from './DraggableIcon';
import { v4 as uuidv4 } from 'uuid';
import { render } from '@testing-library/react';

export default function Canvas() {
	const [canvas, setCanvas] = useState([]);

	const moveIcon = useCallback(
		(index, left, top) => {
			setCanvas(
				update(canvas, {
					[index]: {
						$merge: { left: left, top: top },
					},
				})
			);
		},
		[canvas]
	);

	const updateUUID = useCallback(
		(index, uuid) => {
			setCanvas(
				update(canvas, {
					[index]: {
						$merge: { uuid: uuid },
					},
				})
			);
		},
		[canvas]
	);

	const [, drop] = useDrop(
		() => ({
			accept: 'image',
			drop: (item, monitor) => {
				const delta = monitor.getDifferenceFromInitialOffset();
				const iconList = canvas.filter(
					(icon) => item.uuid === icon.uuid
				);
				let index = canvas
					.map((element) => element.uuid)
					.indexOf(item.uuid);
				let left, top;

				if (iconList.length < 1) {
					setCanvas((canvas) => [...canvas, item]);
					left = monitor.getClientOffset().x;
					top = monitor.getClientOffset().y;
					// let newUUIDV4 = uuidv4();
					// updateUUID(index, newUUIDV4);
					// moveIcon(index, left, top);
				} else {
					left = Math.round(item.left + delta.x);
					top = Math.round(item.top + delta.y);
				}

				// let newUUIDV4 = uuidv4();
				// updateUUID(index, newUUIDV4);
				moveIcon(index, left, top);

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
