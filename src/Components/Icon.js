import { useDrag } from 'react-dnd';

export default function Icon({ uuid, id, src, name }) {
	let left = 0;
	let top = 0;

	const [, drag] = useDrag(
		() => ({
			type: 'image',
			item: { uuid, id, src, left, top, name },
		}),
		[uuid, id, src, left, top, name]
	);

	return (
		<img
			ref={drag}
			type='image/png'
			src={require('../Assets/Icons/' + src)}
			width='50px'
			alt=''
		/>
	);
}
