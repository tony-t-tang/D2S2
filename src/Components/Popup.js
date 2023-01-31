import {
	Dialog,
	DialogContent,
	DialogTitle,
	Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Popup(props) {
	const { children, openPopup, setOpenPopup } = props;

	const handleClose = () => {
		setOpenPopup(false);
	}

	return (
		<Dialog
			open={openPopup}
			onClose={handleClose}
		>
			<DialogTitle>
				<div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
					<Button
						sx={{ color: 'black' }}
						onClick={handleClose}
					>
						<CloseIcon />
					</Button>
				</div>
			</DialogTitle>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
}

export default Popup;
