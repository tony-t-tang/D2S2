import { useDrag } from 'react-dnd';

export default function Icon({id, src}) {
	//FIX DROP LOCATION ON MOUSE
	// Referencing the component before its created
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
