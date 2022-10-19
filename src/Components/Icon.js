import { useDrag } from 'react-dnd';

export default function Icon({id, url}) {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'image',
		item: { id: id },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	}));

	return (
		<img
			ref={drag}
            src={url}
			width='150px'
			style={{ border: isDragging ? '5px solid pink' : '0px' }}
            alt="meow"
		/>
	);
}
