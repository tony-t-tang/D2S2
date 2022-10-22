import '../Assets/Styles/DragDrop.css';
import { Box } from '@mui/material';
import Icon from './Icon';

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
				height: 523,
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
						src={picture.src}
						style={getStyles()}
					/>
				);
			})}
		</Box>
	);
}
