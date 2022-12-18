import React, { useState, useRef, useContext } from 'react';
import { CanvasContext } from '../App';
import { Rnd } from 'react-rnd';

// const componentMap = (key) = {
// 	TEXT: TextElement,
// 	IMAGE: ImageElement,
// };

function imageContainer(img) {
	return {
		backgroundImage: `url(${img})`,
		backgroundSize: 'contain',
		width: '100%',
		height: '100%',
		backgroundRepeat: 'no-repeat',
	};
}

const getEnableResize = () => {
	return {
		bottomLeft: true,
		bottomRight: true,

		topLeft: true,
		topRight: true,

		left: true,
		right: true,
	};
};

export default function CanvasComponent(props) {
	const { actions, state } = useContext(CanvasContext);
	const { dimension, position, content, id, type, src } = props;
	const [showGrids, setShowGrids] = useState(false);
	const isDragged = useRef(false);

	var img = require(`../Assets/Icons/${src}`);

	const style = {
		outline: 'none',
		border: `2px solid ${
			(id && state?.activeSelection.has(id)) ||
			showGrids ||
			isDragged.current
				? 'black'
				: 'transparent'
		}`,
	};

	// const getComponent = () => {
	// 	const Component = type && componentMap[type];
	// 	if (!Component || !id) return null;
	// 	return (
	// 		<Component
	// 			key={id}
	// 			id={id}
	// 			type={type}
	// 			position={position}
	// 			dimension={dimension}
	// 			content={content}
	// 		/>
	// 	);
	// };

	const onClick = () => {
		state.activeSelection.clear();
		state.activeSelection.add(id);
		actions.setActiveSelection(new Set(state.activeSelection));
	};

	const onMouseEnter = () => {
		setShowGrids(true);
	};

	const onMouseLeave = () => {
		setShowGrids(false);
	};

	return (
		<Rnd
			style={style}
			size={{
				width: dimension?.width || 0,
				height: dimension?.height || 0,
			}}
			position={{ x: position?.left || 0, y: position?.top || 0 }}
			onDragStart={() => {
				isDragged.current = true;
			}}
			onDragStop={(e, d) => {
				isDragged.current = false;
				actions?.updateCanvasData({
					id,
					position: { left: d.x, top: d.y },
				});
			}}
			onResize={(e, direction, ref, delta, position) => {
				state.activeSelection.clear();
				state.activeSelection.add(id);
				actions.setActiveSelection(new Set(state.activeSelection));
				actions?.updateCanvasData({
					id,
					dimension: {
						width: ref.style.width,
						height: ref.style.height,
					},
					position: { top: position.y, left: position.x },
				});
			}}
			minWidth={50}
			minHeight={50}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={onClick}
			enableResizing={getEnableResize()}
			lockAspectRatio='true'
			bounds='parent'
		>
			<div style={imageContainer(img)}></div>
		</Rnd>
	);
}
