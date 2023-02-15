import React, { useContext } from 'react';
import '../Assets/Styles/Toolbar.css';
import { Box } from '@mui/material';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import IconButton from '@mui/material/IconButton';
import CallToActionOutlinedIcon from '@mui/icons-material/CallToActionOutlined';
import TitleIcon from '@mui/icons-material/Title';
import DeleteIcon from '@mui/icons-material/Delete';
import { CanvasContext } from '../App';

const iconStyle = {
	color: 'black',
	height: '2.5vh',
	width: '2vw',
};

export default function Toolbar() {
	const { actions, state } = useContext(CanvasContext);

	const handleUndo = () => {
		if (state.undo.length !== 0) {
			actions.setRedo([...state.redo, state.canvas]);
			actions.setCanvas(state.undo.pop());
		}
	};

	const handleRedo = () => {
		if (state.redo.length !== 0) {
			actions.setUndo([...state.undo, state.canvas]);
			actions.setCanvas(state.redo.pop());
		}
	};

	const handleClear = () => {
		actions.setUndo([...state.undo, state.canvas]);
		actions.setCanvas([]);
	};

	return (
		<Box
			sx={{
				backgroundColor: 'white',
				borderRadius: '12px',
				mt: '8%',
				display: 'flex',
				width: '50%',
				padding: '5px'
			}}
		>
			<div className='icons'>
				<IconButton
					sx={iconStyle}
					tabIndex={-1}
					onClick={() => actions.addElement('TEXT', '18.png')}
				>
					<TitleIcon sx={iconStyle} />
				</IconButton>
				<IconButton
					sx={iconStyle}
					tabIndex={-1}
					onClick={() => actions.addElement('TEXT', '19.png')}
				>
					<CallToActionOutlinedIcon sx={iconStyle} />
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
			</div>
		</Box>
	);
}
