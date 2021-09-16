import React from 'react';

//UI
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

//Interface
import { ICartItem } from '../../../interfaces/cart';

interface Props {
	open: boolean,
	items: Array<ICartItem>,
	handleClose: ()=>void
}
const DetailDialog: React.FC<Props> = (props)=> {
	const {
		open,
		items,
		handleClose,
	} = props
	return(
		<Dialog onClose={handleClose} aria-labelledby="cheesse-dialog-title" open={open}>
			 <DialogTitle id="cheese-dialog-title">Cheese Details</DialogTitle>
			 <List>
			 	{items.map((cheese: ICartItem) => (
					<ListItem button key={cheese.id}>
						 <ListItemText primary={cheese.title} />
					</ListItem>
				))}
			 </List>
		</Dialog>
	)
}
export default DetailDialog;