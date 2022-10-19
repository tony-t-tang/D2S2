import React, {useState} from 'react';
import '../Assets/Styles/Toolbar.css';
import { Box } from '@mui/material';
import StopIcon from '@mui/icons-material/PanTool';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import ResizeIcon from '@mui/icons-material/AspectRatio';
import GrabIcon from '@mui/icons-material/PanToolAlt';

export default function Toolbar() {
		const [click, setClick] = useState(GrabIcon);
		function Grab(){
			click = StopIcon;
			setClick(GrabIcon);
	}
	return (
		<Box
			sx={{
				width: 200,
				height: 65,
				backgroundColor: '#D9D9D9',
				border: 1,
			}}
		>
			<div className='Icons'>
		
			<button onClick = {setClick}><StopIcon/></button>
			<button><RedoIcon /></button>
			<button><UndoIcon /></button>
			<button><ResizeIcon /></button>
			</div>
		</Box>
	);
}
