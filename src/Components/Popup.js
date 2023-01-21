import {
	Dialog,
	DialogContent,
	DialogTitle,
	Typography,
	Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Popup(props) {
	const { children, openPopup, setOpenPopup } = props;

	return (
		<Dialog open={openPopup}>
			<DialogTitle>
				<div style={{ display: 'flex' }}>
					<Button onClick={() => setOpenPopup(false)}>
						<CloseIcon />
					</Button>
				</div>
			</DialogTitle>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
}

export default Popup;
