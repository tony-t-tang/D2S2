import React, { useState, useRef, useContext } from 'react';
import { CanvasContext } from '../App';
import { Rnd } from 'react-rnd';
import ImageElement from './ImageElement';
import TextElement from './TextElement';


const getEnableResize = (type) => {
	return {
		bottom: type === 'TEXT',
		bottomLeft: true,
		bottomRight: true,

		top: type === 'TEXT',
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

	const getComponent = () => {
		return type === 'TEXT' ? (
			<TextElement content={content} />
		) : (
			<ImageElement src={src} />
		);
	};

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
			enableResizing={getEnableResize(type)}
			lockAspectRatio={type === 'IMAGE'}
			bounds='parent'
		>
			{getComponent()}
		</Rnd>
	);
}
