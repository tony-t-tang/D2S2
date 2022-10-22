import { useDrag } from 'react-dnd';
// import { getEmptyImage } from 'react-dnd-html5-backend';
// import { useEffect } from 'react';

export default function Icon({id, src}) {
	//FIX DROP LOCATION ON MOUSE
	let left = window.event.clientX - window.event.target.offsetLeft;
	let top = window.event.clientY - window.event.target.offsetTop;

	console.log(left)
	console.log(top)

	const [, drag] = useDrag(
		() => ({
			type: 'image',
			item: { id, src, left, top },
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
		}),
		[id, src, left, top]
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
