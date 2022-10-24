import './Assets/Styles/MainFrame.css';
import DragDrop from './Components/DragDrop';
import Canvas from './Components/Canvas';
import Suggestion from './Components/Suggestion';
import TopPicks from './Components/TopPicks';
import Toolbar from './Components/Toolbar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function MainFrame() {
	return (
		<DndProvider backend={HTML5Backend}>
			<div className='main-frame'>
				<div className='PSDoodle'>PSDoodle</div>
				<div className='idk'>
					<div>
						<Toolbar />
						<DragDrop />
					</div>
					<Canvas />
					<Suggestion />
					<TopPicks />
				</div>
			</div>
		</DndProvider>
	);
}

export default MainFrame;
