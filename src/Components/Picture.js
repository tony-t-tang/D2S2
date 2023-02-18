import React, { useState } from 'react';
import Popup from '../Components/Popup';
import { motion } from 'framer-motion';

export default function Picture(props) {
	const { src } = props;
	const [openPopup, setOpenPopup] = useState(false);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				ease: 'easeOut',
				duration: 2,
			}}
			layout
		>
			<img
				className={'image'}
				src={`https://ricoimage.s3.us-east-2.amazonaws.com/thumbnails/${src}.jpg`}
				alt=''
				onClick={() => setOpenPopup(true)}
			></img>
			<Popup
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
				color='inherit'
			>
				<img
					style={{ border: 'solid', borderSize: 0.5 }}
					className={'popup'}
					src={`https://ricoimage.s3.us-east-2.amazonaws.com/OnlyImage/${src}.jpg`}
					alt=''
				></img>
			</Popup>
		</motion.div>
	);
}
