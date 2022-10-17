import './Assets/Styles/MainFrame.css';
import DragDrop from './Components/DragDrop';
import Canvas from './Components/Canvas';
import Suggestion from './Components/Suggestion';
import TopPicks from './Components/TopPicks';
function MainFrame() {
	return (
		<div className='main-frame'>
			PSDoodle
			<div className='idk'>
				<DragDrop />
				<Canvas />
				<Suggestion />
				<TopPicks />
			</div>
		</div>
	);
}

export default MainFrame;
