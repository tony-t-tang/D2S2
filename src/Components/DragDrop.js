import React from 'react';
import '../Assets/Styles/DragDrop.css';
import { Box } from '@mui/material';

export default function DragDrop() {
	return (
		<Box
			sx={{
				width: 200,
				height: 500,
				backgroundColor: '#D9D9D9',
			}}
		>
			Drag and Drop
		</Box>
	);
}
