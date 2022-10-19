import React from 'react';
import '../Assets/Styles/Toolbar.css';
import { Box } from '@mui/material';
import StopIcon from '@mui/icons-material/PanTool';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import ResizeIcon from '@mui/icons-material/AspectRatio';
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
			<StopIcon />
			<RedoIcon />
			<UndoIcon />
			<ResizeIcon />
		</Box>
	);
}
