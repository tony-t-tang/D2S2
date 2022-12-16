import React, { useMemo, useState } from 'react';
import '../Assets/Styles/toolbar.css';
import { Box } from '@mui/material';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import IconButton from '@mui/material/IconButton';
import TextFieldsIcon from '@mui/icons-material/TextFields';

export default function Toolbar() {

	return (
		<div className='toolbar'>
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
						<TextFieldsIcon />
					</IconButton>
					<IconButton sx={{ color: 'black' }}>
						<RedoIcon />
					</IconButton>
					<IconButton sx={{ color: 'black' }}>
						<UndoIcon />
					</IconButton>
				</div>
			</Box>
		</div>
	);
}
