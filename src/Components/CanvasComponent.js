import { useState } from 'react';
import { Rnd } from 'react-rnd';

function imageContainer(img) {
	return {
		backgroundImage: `url(${img})`,
		backgroundSize: 'contain',
		width: '100%',
		height: '100%',
		backgroundRepeat: 'no-repeat',
	};
}

export default function CanvasComponent({ uuid, id, src, name, left, top }) {
	const [showGrids, setShowGrids] = useState(false);
	var img = require(`../Assets/Icons/${src}`);

	const onMouseEnter = () => {
		setShowGrids(true);
	};

	const onMouseLeave = () => {
		setShowGrids(false);
	};

	return (
		<Rnd
			style={{ border: 'solid' }}
			minWidth={50}
			minHeight={50}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			lockAspectRatio='true'
			bounds='parent'
		>
			<div style={imageContainer(img)}></div>
		</Rnd>
	);
}
