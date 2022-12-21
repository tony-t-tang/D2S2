import React from 'react';

function imageContainer(img) {
	return {
		backgroundImage: `url(${img})`,
		backgroundSize: 'contain',
		width: '100%',
		height: '100%',
		backgroundRepeat: 'no-repeat',
	};
}

function ImageElement(props) {
	var { src } = props;
	var img = require(`../Assets/Icons/${src}`);

	return <div style={imageContainer(img)}></div>;
}

export default ImageElement;
