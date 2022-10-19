import '../Assets/Styles/Canvas.css';
import { useState } from 'react';
import { Box } from '@mui/material';
import Icon from './Icon';
import { useDrop } from 'react-dnd';

const PictureList = [
	{
		id: 1,
		url: 'https://yt3.ggpht.com/ytc/AAUvwnjOQiXUsXYMs8lwrd4litEEqXry1-atqJavJJ09=s900-c-k-c0x00ffffff-no-rj',
	},
	// {
	// 	id: 2,
	// 	url: 'https://media-exp1.licdn.com/dms/image/C4D03AQExheo0sff_yQ/profile-displayphoto-shrink_200_200/0/1590072898568?e=1630540800&v=beta&t=_W-gWZewSBYQ-UAjpGvR8h_8Vvo202IHQQissbK2aKc',
	// },
	// {
	// 	id: 3,
	// 	url: 'https://yt3.ggpht.com/pe57RF1GZibOWeZ9GwRWbjnLDCK2EEAeQ3u4iMAFNeaz-PN9uSsg1p2p32TZUedNnrUhKfoOuMM=s900-c-k-c0x00ffffff-no-rj',
	// },
];

export default function Canvas() {
	const [canvas, setCanvas] = useState([]);

	const [{ isOver }, drop] = useDrop(() => ({
		accept: 'image',
		drop: (item) => addIconToCanvas(item.id),
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	}));

	const addIconToCanvas = (id) => {
		const iconList = PictureList.filter((picture) => id === picture.id);
		setCanvas((canvas) => [...canvas, iconList[0]]);
	};

	return (
		<Box
			sx={{
				width: 500,
				height: 565,
				backgroundColor: '#D9D9D9',
				border: 1,
			}}
		>
			Canvas
			<div className='Pictures'>
				{PictureList.map((picture) => {
					return (
						<Icon
							url={picture.url}
							id={picture.id}
						/>
					);
				})}
			</div>
			<div
				className='Board'
				ref={drop}
			>
				{canvas.map((picture) => {
					return (
						<Icon
							url={picture.url}
							id={picture.id}
						/>
					);
				})}
			</div>
		</Box>
	);
}
