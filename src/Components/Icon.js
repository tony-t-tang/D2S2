import { useDrag } from 'react-dnd';

export default function Icon({ id, src, left, top }) {
	//FIX DROP LOCATION ON MOUSE

	

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
			src={require("../Assets/Icons/" + src)}
			width='50px'
			alt='error'
		/>
	);
}
