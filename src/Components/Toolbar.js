import React, { useState } from 'react';
import '../Assets/Styles/Toolbar.css';
import { Box } from '@mui/material';
import StopIcon from '@mui/icons-material/PanTool';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import ResizeIcon from '@mui/icons-material/AspectRatio';
import IconButton from '@mui/material/IconButton';

export default function Toolbar() {
	const [click, setClick] = useState('');

	return (
		<div className='Toolbar'>
			<Box
				sx={{
					width: 202,
					height: 38,
					backgroundColor: '#D9D9D9',
					border: 1,
				}}
			>
				<div className='icons'>
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
		</div>
	);
}
