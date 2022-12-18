import './Assets/Styles/App.css';
import DragDrop from './Components/DragDropList';
import Canvas from './Components/Canvas';
import Suggestion from './Components/Suggestion';
import TopPicks from './Components/TopPicks';
import Toolbar from './Components/Toolbar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createContext, useState, useCallback, useEffect } from 'react';

export const CanvasContext = createContext();

function App() {
	const [canvas, setCanvas] = useState([]);
	const [activeSelection, setActiveSelection] = useState(new Set());

	const updateCanvasData = (data) => {
		const currentDataIndex =
			canvas.findIndex((canvas) => canvas.id === data.id) ?? -1;
		const updatedData = { ...canvas?.[currentDataIndex], ...data };
		canvas.splice(currentDataIndex, 1, updatedData);
		setCanvas([...(canvas || [])]);
	};

	const addElement = (type, src) => {
		const defaultData = {
			type: type,
			src: type === 'TEXT' ? null : src,
			id: `${type}__${Date.now()}__${canvas.length}`,
			position: {
				top: 50,
				left: 50,
			},
			dimension: {
				width: type === 'TEXT' ? '150' : '50',
				height: '50',
			},
			content: type === 'TEXT' ? 'Sample Text' : '',
		};
		setCanvas([...canvas, { ...defaultData, type: type ?? 'TEXT' }]);
		activeSelection.clear();
		activeSelection.add(defaultData.id);
		setActiveSelection(new Set(activeSelection));
	};

	const deleteElement = useCallback(() => {
		setCanvas([
			...canvas.filter((data) => {
				if (data.id && activeSelection.has(data.id)) {
					activeSelection.delete(data.id);
					return false;
				}
				return true;
			}),
		]);
		setActiveSelection(new Set(activeSelection));
	}, [activeSelection, canvas]);

	const context = {
		actions: {
			setCanvas,
			setActiveSelection,
			addElement,
			deleteElement,
			updateCanvasData,
		},
		state: {
			canvas,
			activeSelection,
		},
	};

	const handleMouseDown = useCallback((event) => {
		setActiveSelection(new Set());
	}, []);

	useEffect(() => {
		document.addEventListener('mousedown', handleMouseDown);
		return () => {
			document.removeEventListener('mousedown', handleMouseDown);
		};
	}, [handleMouseDown]);

	return (
		<DndProvider backend={HTML5Backend}>
			<div className='background'>
				<div className='title'>PSDoodle</div>
				<CanvasContext.Provider value={context}>
					<div className='main-container'>
						<div>
							<Toolbar />
							<DragDrop />
						</div>
						<Canvas />
						<Suggestion />
						<TopPicks />
					</div>
				</CanvasContext.Provider>
			</div>
		</DndProvider>
	);
}

export default App;
