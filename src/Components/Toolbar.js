import React from 'react';
import '../Assets/Styles/Toolbar.css';
import { Box } from '@mui/material';

export default function Toolbar() {
	return (
		<Box
			sx={{
				width: 200,
				height: 65,
				backgroundColor: '#D9D9D9',
                border: 1,
			}}
		>
			Toolbar
		</Box>
	);
}
