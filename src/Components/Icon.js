import { useDrag } from 'react-dnd';
// import { getEmptyImage } from 'react-dnd-html5-backend';
// import { useEffect } from 'react';

export default function Icon({id, src, left, top}) {
	
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
			src={src}
			width='150px'
			alt='error'
		/>
	);
}
