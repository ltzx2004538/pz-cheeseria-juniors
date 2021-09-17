import React from 'react';
//Component
import Avatar from '../../Avatar/Avatar';

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
	item: ICartItem,
	handleClose: ()=>void
}

const DetailDialog: React.FC<Props> = (props)=> {
	const {
		open,
		item,
		handleClose,
	} = props;

	return(
		<Dialog onClose={handleClose} aria-labelledby="cheesse-dialog-title" open={open}>
			 <DialogTitle id="cheese-dialog-title">Cheese Details</DialogTitle>
			 <List>
				<ListItem>
					<ListItemText primary={`${item.id}. ${item.title}`}/>
					<Avatar name= {item.title} imgUrl= {item.image}/>
				</ListItem>
				<ListItem>
					<ListItemText primary={item.description}/>
				</ListItem>
				<ListItem>
					<ListItemText primary={`Price: $${item.price}`}/>
				</ListItem>
			 </List>
		</Dialog>
	)
}
export default DetailDialog;