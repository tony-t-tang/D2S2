import './Assets/Styles/App.css';
import IconList from './Components/IconList';
import Canvas from './Components/Canvas';
import TopPicks from './Components/TopPicks';
import Toolbar from './Components/Toolbar';
import { Link } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createContext, useState, useCallback, useEffect, useRef } from 'react';

export const CanvasContext = createContext();

function App() {
	const [canvas, setCanvas] = useState([]);
	const [threshold, setThreshold] = useState([]);
	const [undo, setUndo] = useState([]);
	const [redo, setRedo] = useState([]);
	const [activeSelection, setActiveSelection] = useState(new Set());
	const mouseRef = useRef({ x: 0, y: 0 });
	const canvasRef = useRef(null);

	const updateCanvasData = (data) => {
		const currentDataIndex =
			canvas.findIndex((canvas) => canvas.id === data.id) ?? -1;
		const updatedData = { ...canvas?.[currentDataIndex], ...data };
		canvas.splice(currentDataIndex, 1, updatedData);
		setCanvas([...(canvas || [])]);
		// setThreshold([...(canvas || [])]);
	};

	const addElement = (src, type, content, top, left) => {
		const defaultData = {
			type: type,
			src: src,
			id: `${type}__${Date.now()}`,
			position: {
				top: top ? top : canvasRef.current.clientHeight / 2 - 25,
				left: left
					? left
					: canvasRef.current.clientWidth / 2 -
					  (type === 'TEXT' ? 45 : 25),
			},
			dimension: {
				width: type === 'TEXT' ? '90' : '50',
				height: '50',
			},
			content: content,
		};
		if (redo.length > 0) {
			setRedo([]);
		}
		setUndo([...undo, threshold]);
		setCanvas([...canvas, { ...defaultData }]);
		setThreshold([...canvas, { ...defaultData }]);
		activeSelection.clear();
		activeSelection.add(defaultData.id);
		setActiveSelection(new Set(activeSelection));
	};

	const deleteElement = useCallback(() => {
		setUndo([...undo, threshold]);
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
		setThreshold([
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
			setThreshold,
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
			canvasRef,
			threshold,
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
			<h1 className='title'>D2S2</h1>
			<CanvasContext.Provider value={context}>
				<div className='main-container'>
					<p className='tag'>
					Drag ’n’ Drop Mobile App Screen Search
					</p>
					<div className='left-container'>
						<div className='list-container'>
							<IconList />
						</div>
						<div className='canvas-container'>
							<Canvas />
							<Toolbar />
						</div>
					</div>
					<TopPicks />
				</div>
				<Link
					fontSize={20}
					color='#ffffff'
					position='absolute'
					bottom={0}
					ml={3}
					mb={3}
					target='_blank'
					href='https://forms.gle/QURxuNncDhVyUCR2A'
				>
					Please give us feedback
				</Link>
			</CanvasContext.Provider>
		</DndProvider>
	);
}

export default App;
