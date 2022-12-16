import './Assets/Styles/App.css';
import DragDrop from './Components/DragDropList';
import Canvas from './Components/Canvas';
import Suggestion from './Components/Suggestion';
import TopPicks from './Components/TopPicks';
import Toolbar from './Components/Toolbar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createContext, useState } from 'react';

export const CanvasContext = createContext();

function App() {
	const [canvas, setCanvas] = useState([]);

	const context = {
		actions: {
			setCanvas,
		},
		state: {
			canvas,
		},
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div className='background'>
				<div className='PSDoodle'>PSDoodle</div>
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
