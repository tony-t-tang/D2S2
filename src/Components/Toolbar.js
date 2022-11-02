import React, { useMemo, useState } from 'react';
import '../Assets/Styles/Toolbar.css';
import { Box } from '@mui/material';
import StopIcon from '@mui/icons-material/PanTool';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import ResizeIcon from '@mui/icons-material/AspectRatio';
import IconButton from '@mui/material/IconButton';
import isEqual from 'lodash/isEqual';
import useUndoableState from './Canvas.js';
export default function Toolbar(init) {
	const [schedule, setSchedule] = useState([]);
    const [loads, setLoads] = useState([]);
    const [undo, setUndo] = useState([]);
    const [redo, setRedo] = useState([]);

    const updateData = (newSchedule, newLoads) => {
    setSchedule([...newSchedule]);
    setLoads([...newLoads]);

    const newUndo = {
      schedule: [...newSchedule],
      loads: [...newLoads],
    };

    setUndo([...undo, ...newUndo]);
  }

  const undoChanges = () => {
    const lastElement = undo[undo.length - 1];
    const copyOfUndo = [...undo];
    
    // Update redo to be able to rollback
    setRedo([...undo]);

    // Set the previous values to Schedule and Loads
    schedule([...lastElement.schedule]);
    loads([...lastElement.loads]);

    // Remove the last element from undo
    lastElement.pop();
    undo([...lastElement]);
  }

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

					<IconButton
						onClick={() => redo}
						sx={{ color: 'black' }}
					>
						<RedoIcon />
					</IconButton>

					<IconButton
						onClick={() => undo}
						sx={{ color: 'black' }}
					>
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
