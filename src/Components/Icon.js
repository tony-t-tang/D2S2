import { useDrag } from 'react-dnd';
import { v4 as uuidv4} from 'uuid';
// import { getEmptyImage } from 'react-dnd-html5-backend';
// import { useEffect } from 'react';

export default function Icon({id, src}) {
	//assigning uuid
	let uuid = uuidv4();
	//FIX DROP LOCATION ON MOUSE
	let right = window.event.clientX + window.event.target.offsetRight;
	let left = window.event.clientX - window.event.target.offsetLeft;
	let top = window.event.clientY - window.event.target.offsetTop;
	let down = window.event.clientY + window.event.target.offsetDown;
	console.log(left)
	console.log(top)
	console.log(right)
	console.log(down)
	const [, drag] = useDrag(
		() => ({
		
			type: 'image',
			item: { id, uuid, src, left, top,right, down},
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
		}),
		[id, src, left, top,right,down, uuid]
	);

	return (
		<img
			ref={drag}
			type='image/png'
			src={src}
			width='150px'
			alt='error'
		/>
	);
}
