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
	let PictureList = require('../Data/PictureList.json');
	
	return (
	
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
						id={picture.id}
						src={picture.src}
						style={getStyles()}
					/>
				);
			})}
		</Box>

	);
}
