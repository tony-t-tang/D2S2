import { useDrag } from 'react-dnd';

export default function Icon({ src }) {
	const [, drag] = useDrag(
		() => ({
			type: 'image',
			item: { src },
		}),
		[src]
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
