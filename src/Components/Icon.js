import { useDrag } from 'react-dnd';
import { motion } from 'framer-motion';

export default function Icon({ src }) {
	const [, drag] = useDrag(
		() => ({
			type: 'image',
			item: { src },
		}),
		[src]
	);

	return (
		<motion.img
			layout
			ref={drag}
			type='image/png'
			src={require('../Assets/Icons/' + src)}
			width='50px'
			alt=''
		/>
	);
}
