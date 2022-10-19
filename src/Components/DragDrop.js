import React from 'react';
import '../Assets/Styles/DragDrop.css';
import { Box } from '@mui/material';

export default function DragDrop() {
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
		</Box>
	);
}
