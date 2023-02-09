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
		<div className='toolbar'>
			<Box
				sx={{
					width: 202,
					height: 38,
					backgroundColor: 'white',
					ml: '30%', 
					mt: '8%',
					borderRadius: '12px'
				}}
			>
				<div className='icons'>
					<IconButton
						sx={{ color: 'black' }}
						tabIndex={-1}
						onClick={() => actions.addElement('TEXT', '18.png')}
					>
						<TitleIcon />
					</IconButton>
					<IconButton
						sx={{ color: 'black' }}
						tabIndex={-1}
						onClick={() => actions.addElement('TEXT', '19.png')}
					>
						<CallToActionOutlinedIcon />
					</IconButton>
					<IconButton
						sx={{ color: 'black' }}
						tabIndex={-1}
						onClick={handleUndo}
					>
						<UndoIcon />
					</IconButton>
					<IconButton
						sx={{ color: 'black' }}
						tabIndex={-1}
						onClick={handleRedo}
					>
						<RedoIcon />
					</IconButton>
					<IconButton
						sx={{ color: 'black' }}
						tabIndex={-1}
						onClick={() => actions.setCanvas([])}
						onClick={handleClear}
					>
						<DeleteIcon />
					</IconButton>
				</div>
			</Box>
		</div>
	);
}
