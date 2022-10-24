import '../Assets/Styles/DragDrop.css';
import { Box } from '@mui/material';
import Icon from './Icon';
import Search from './Search';
import { v4 as uuidv4} from 'uuid';

function getStyles() {
	return {
		position: 'relative',
	};
}

export default function DragDrop() {
	let PictureList = require('../Data/PictureList.json');

	return (
		<Box
			className = 'InsideDragDrop'
			sx={{
				width: 200,
				height: 524,
				backgroundColor: '#D9D9D9',
				border: 2,		
			}}
		>
			Drag & Drop
			<Search/>
			{PictureList.map((picture) => {
				return (
					<Icon
						id={picture.id}
						src={picture.src}
						left={-200}
						top={-200}
						style={getStyles()}
					/>
				);
			})}
		</Box>
		
	);
}
