import React, { useContext } from 'react';
import '../Assets/Styles/Toolbar.css';
import { Box, Typography, Button } from '@mui/material';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { CanvasContext } from '../App';

const iconStyle = {
	color: 'black',
	height: '2.5vh',
	width: '2vw',
};

const textStyle = {
	color: 'black',
	height: '1.25vh',
	display: 'flex',
	fontSize: '1vw',
	flexDirection: 'column',
	textAlign: 'center',
	alignContent: 'center',
	justifyContent: 'center',
};

export default function Toolbar() {
	const { actions, state } = useContext(CanvasContext);

	const handleUndo = () => {
		if (state.undo.length !== 0) {
			actions.setRedo([...state.redo, state.threshold]);
			let undo = state.undo.pop();
			actions.setCanvas(undo);
			actions.setThreshold(undo);
		}
	};

	const handleRedo = () => {
		if (state.redo.length !== 0) {
			actions.setUndo([...state.undo, state.threshold]);
			let redo = state.redo.pop();
			actions.setCanvas(redo);
			actions.setThreshold(redo);
		}
	};

	const handleClear = () => {
		actions.setUndo([...state.undo, state.threshold]);
		actions.setCanvas([]);
		actions.setThreshold([]);
	};

	return (
		<Box
			sx={{
				backgroundColor: 'white',
				borderRadius: '12px',
				mt: '8%',
				display: 'flex',
				flexDirection: 'row',
				width: '60%',
				padding: '5px',
				justifyContent: 'space-around',
				alignContent: 'center',
				textAlign: 'center',
			}}
		>
			<IconButton
				tabIndex={-1}
				onClick={() =>
					actions.addElement('18.png', 'TEXT', '<p>Text Box</p>')
				}
			>
				<Typography sx={textStyle}>TEXT</Typography>
			</IconButton>
			<IconButton
				sx={iconStyle}
				tabIndex={-1}
				onClick={handleUndo}
			>
				<UndoIcon sx={iconStyle} />
			</IconButton>
			<IconButton
				sx={iconStyle}
				tabIndex={-1}
				onClick={handleRedo}
			>
				<RedoIcon sx={iconStyle} />
			</IconButton>
			<IconButton
				sx={iconStyle}
				tabIndex={-1}
				onClick={handleClear}
			>
				<DeleteIcon sx={iconStyle} />
			</IconButton>
		</Box>
	);
}
