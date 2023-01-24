import React, { useState } from 'react';
import Popup from '../Components/Popup';

export default function Picture(props) {
	const { src } = props;
	const [openPopup, setOpenPopup] = useState(false);

	return (
		<div>
			<img
				className={'image'}
				src={`https://ricoimage.s3.us-east-2.amazonaws.com/OnlyImage/${src}.jpg`}
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
		</div>
	);
}
