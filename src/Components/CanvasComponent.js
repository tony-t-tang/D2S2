import React, { useState, useRef, useContext, useEffect } from 'react';
import { CanvasContext } from '../App';
import { Rnd } from 'react-rnd';
import ImageElement from './ImageElement';
import TextElement from './TextElement';

const getEnableResize = () => {
	return {
		bottom: true,
		bottomLeft: true,
		bottomRight: true,

		top: true,
		topLeft: true,
		topRight: true,

		left: true,
		right: true,
	};
};

export default function CanvasComponent(props) {
	const { actions, state } = useContext(CanvasContext);
	const { dimension, position, content, id, type, src } = props;
	const [readOnly, setReadOnly] = useState(true);
	const [showGrids, setShowGrids] = useState(false);
	const isDragged = useRef(false);

	const style = {
		outline: 'none',
		overflow: 'hidden',
		border: `2px ${src === '19.png' ? 'dashed' : 'solid'} ${
			(id && state?.activeSelection.has(id)) ||
			showGrids ||
			isDragged.current ||
			type === 'TEXT'
				? 'black'
				: 'transparent'
		}`,
	};

	const getComponent = () => {
		if (type === 'IMAGE') {
			return <ImageElement src={src} />;
		} else {
			return (
				<TextElement
					content={content}
					id={id}
					readOnly={readOnly}
				></TextElement>
			);
		}
	};

	const onMouseEnter = () => {
		setShowGrids(true);
	};

	const onMouseLeave = () => {
		setShowGrids(false);
	};

	const onBlur = (event) => {
		if (event.currentTarget.contains(event.relatedTarget)) {
			return;
		}
		setReadOnly(true);
	};

	const onFocus = () => {
		if (id) {
			state.activeSelection.clear();
			state.activeSelection.add(id);
			actions.setActiveSelection(new Set(state.activeSelection));
		}
	};

	const onClick = () => {
		state.activeSelection.clear();
		state.activeSelection.add(id);
		actions.setActiveSelection(new Set(state.activeSelection));
	};

	const onDoubleClick = () => {
		if (!readOnly) return;
		setReadOnly(false);
	};

	const onKeyDown = (event) => {
		if (!readOnly) event.stopPropagation();
	};

	return (
		<Rnd
			style={style}
			size={{
				width: dimension.width || 0,
				height: dimension.height || 0,
			}}
			position={{ x: position.left || 0, y: position.top || 0 }}
			onDragStart={(e, d) => {
				isDragged.current = true;
				actions.setUndo([...state.undo, state.threshold]);
				actions.updateCanvasData({
					id,
				});
			}}
			onDragStop={(e, d) => {
				isDragged.current = false;
				actions.updateCanvasData({
					id,
					position: {
						left: d.x,
						top: d.y,
					},
				});
			}}
			onResizeStart={(e, direction, ref) => {
				actions.setUndo([...state.undo, state.threshold]);
				state.activeSelection.clear();
				state.activeSelection.add(id);
				actions.setActiveSelection(new Set(state.activeSelection));
				actions.updateCanvasData({
					id,
				});
			}}
			onResizeStop={(e, direction, ref, delta, position) => {
				state.activeSelection.clear();
				state.activeSelection.add(id);
				actions.setActiveSelection(new Set(state.activeSelection));
				actions.updateCanvasData({
					id,
					dimension: {
						width: ref.style.width,
						height: ref.style.height,
					},
					position: { top: position.y, left: position.x },
				});
			}}
			width={dimension.width}
			height={dimension.height}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={onClick}
			onDoubleClick={onDoubleClick}
			onFocus={onFocus}
			onBlur={onBlur}
			onKeyDown={onKeyDown}
			enableResizing={getEnableResize()}
			tabIndex={0}
			lockAspectRatio={type === 'IMAGE'}
			bounds='parent'
		>
			{getComponent()}
		</Rnd>
	);
}
