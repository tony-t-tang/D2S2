import '../Assets/Styles/DragDrop.css';
import { Box } from '@mui/material';
import Icon from './Icon';
import { v4 as uuidv4} from 'uuid';
function getStyles() {
	return {
		position: 'relative',
	};
}


export default function DragDrop() {
	
	let uuid = uuidv4();
	let PictureList = require('../Data/PictureList.json');

	return (
		<div className = 'scrollbar'>
		<Box
			sx={{
				width: 200,
				height: 502,
				backgroundColor: '#D9D9D9',
				border: 1,
				
			}}
			
		>
			Drag & Drop
			{PictureList.map((picture) => {
				return (
					<Icon
						key={picture.id}
						id={picture.id}
						uuid = {picture.uuid}
						src={picture.src}
						style={getStyles()}
					/>
				);
			})}
		</Box>
		</div>
	);
}
