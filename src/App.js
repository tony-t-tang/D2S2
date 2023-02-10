import './Assets/Styles/App.css';
import DragDrop from './Components/IconList';
import Canvas from './Components/Canvas';
import TopPicks from './Components/TopPicks';
import Toolbar from './Components/Toolbar';
import { Box, Link, Stack } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createContext, useState, useCallback, useEffect, useRef } from 'react';

export const CanvasContext = createContext();

function App() {
	const [canvas, setCanvas] = useState([]);
	const [undo, setUndo] = useState([]);
	const [redo, setRedo] = useState([]);
	const [activeSelection, setActiveSelection] = useState(new Set());
	const mouseRef = useRef({ x: 0, y: 0 });

	const updateCanvasData = (data) => {
		const currentDataIndex =
			canvas.findIndex((canvas) => canvas.id === data.id) ?? -1;
		const updatedData = { ...canvas?.[currentDataIndex], ...data };
		canvas.splice(currentDataIndex, 1, updatedData);
		setCanvas([...(canvas || [])]);
	};

	const addElement = (type, src, top, left) => {
		const defaultData = {
			type: type,
			src: src,
			id: `${type}__${Date.now()}`,
			position: {
				top: top,
				left: left,
			},
			dimension: {
				width: type === 'TEXT' ? '90' : '50',
				height: '50',
			},
			content: type === 'TEXT' ? '<p>Enter Text</p>' : '',
		};
		if (redo.length > 0) {
			setRedo([]);
		}
		setUndo([...undo, canvas]);
		setCanvas([...canvas, { ...defaultData, type: type ?? 'TEXT' }]);
		activeSelection.clear();
		activeSelection.add(defaultData.id);
		setActiveSelection(new Set(activeSelection));
	};

	const deleteElement = useCallback(() => {
		setUndo([...undo, canvas]);
		setCanvas([
			...canvas.filter((data) => {
				console.log(data);
				if (data.id && activeSelection.has(data.id)) {
					activeSelection.delete(data.id);
					return false;
				}
				return true;
			}),
		]);
		setActiveSelection(new Set());
	}, [activeSelection, canvas, undo]);

	const context = {
		actions: {
			setCanvas,
			setUndo,
			setRedo,
			setActiveSelection,
			addElement,
			deleteElement,
			updateCanvasData,
		},
		state: {
			canvas,
			undo,
			redo,
			activeSelection,
			mouseRef,
		},
	};

	const handleKeyDown = useCallback(
		(event) => {
			if (
				(event.key === 'Delete' || event.key === 'Backspace') &&
				activeSelection.size > 0
			) {
				deleteElement();
			}
		},
		[deleteElement, activeSelection]
	);

	const handleMouseDown = useCallback(() => {
		setActiveSelection(new Set());
	}, []);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('mousedown', handleMouseDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('mousedown', handleMouseDown);
		};
	}, [handleKeyDown, handleMouseDown]);

	return (
		<DndProvider backend={HTML5Backend}>
			<h1 className='title'>
				PSDoodle
			</h1>
			<CanvasContext.Provider value={context}>
				<div className='main-container'>
					<div className='left-container'>
						<DragDrop />
						<div className='canvas-container'>
							<Canvas />
							<Toolbar />
						</div>
					</div>
					<TopPicks />
				</div>
				<Link
					fontSize={20} color='#ffffff'
					position='absolute'
					bottom={0} ml={3} mb={3}
					target="_blank"
					href='https://forms.gle/QURxuNncDhVyUCR2A'
				>
					Please give us feedback
				</Link>
			</CanvasContext.Provider>
		</DndProvider>
	);
}

export default App;
