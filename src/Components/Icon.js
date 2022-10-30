import { useDrag } from 'react-dnd';

export default function Icon({ id, src }) {
	//FIX DROP LOCATION ON MOUSE
	let left = 0;
	let top = 0;

	const [, drag] = useDrag(
		() => ({
			type: 'image',
			item: { id, src, left, top },
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
