import React from 'react';
import {Dialog, DialogTitle, DialogActions} from '@material-ui/core';
import {CheckOutBtn} from './MessageDialog.styles';

interface Props {
	message: string;
	isDialogShow: boolean;
	handleCloseDialog: ()=>void;
}

const MessageDialog: React.FC<Props> = (props)=>{
	const {message, isDialogShow, handleCloseDialog} = props;
	return(
		<Dialog  
				open={isDialogShow}
				onClose={handleCloseDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">
				{message}
		 	</DialogTitle>
			<DialogActions>
				<CheckOutBtn onClick={handleCloseDialog}>
					{"OK"}
				</CheckOutBtn>
			</DialogActions>
		</Dialog>
	)
}

export default MessageDialog;