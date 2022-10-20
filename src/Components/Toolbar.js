import React, { useState } from 'react';
import '../Assets/Styles/Toolbar.css';
import { Box } from '@mui/material';
import StopIcon from '@mui/icons-material/PanTool';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import ResizeIcon from '@mui/icons-material/AspectRatio';
import GrabIcon from '@mui/icons-material/PanToolAlt';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

export default function Toolbar() {
	const [click, setClick] = useState('');

	// handle for when you click icon to change state

	// handle for each icon function

	function Grab() {
		click = StopIcon;
		setClick = StopIcon;
	}

	return (
		<Box
			sx={{

				width: 200,
				height: 40,
				backgroundColor: '#D9D9D9',
				border: 1,
				
				
			}}
		>
			<div className='Icons'>
				<IconButton sx={{ color: 'black' }}>
					<StopIcon />
				</IconButton>
				<IconButton sx={{ color: 'black' }}>
					<RedoIcon />
				</IconButton>
				<IconButton sx={{ color: 'black' }}>
					<UndoIcon />
				</IconButton>
				<IconButton sx={{ color: 'black' }}>
					<ResizeIcon />
				</IconButton>
			</div>
		</Box>
	);
}
