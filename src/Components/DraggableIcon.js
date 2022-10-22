import { useDrag } from 'react-dnd';

function getStyles(left, top, isDragging) {
	const transform = `translate3d(${left}px, ${top}px, 0)`;
	return {
		position: 'absolute',
		transform,
		WebkitTransform: transform,
		opacity: isDragging ? 0 : 1,
		height: isDragging ? 0 : '',
	};
}

export default function DraggableIcon({ id, src, left, top }) {
	
    const [{ isDragging }, drag] = useDrag(
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
            style={getStyles(left, top, isDragging)}
			alt='error'
		/>
	);
}
