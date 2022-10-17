import './Assets/Styles/MainFrame.css';
import DragDrop from './Components/DragDrop';
import Canvas from './Components/Canvas';
import Suggestion from './Components/Suggestion';
import TopPicks from './Components/TopPicks';
import Toolbar from './Components/Toolbar';

function MainFrame() {
	return (
		<div className='main-frame'>
			PSDoodle
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
	);
}

export default MainFrame;
