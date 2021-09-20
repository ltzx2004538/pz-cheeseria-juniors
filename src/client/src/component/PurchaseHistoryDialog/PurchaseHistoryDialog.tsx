import React from 'react';
import { ListItem, ListItemText, DialogTitle, Dialog, DialogContent, DialogContentText } from '@material-ui/core';
import {IOrder, IOrderItem} from '../../interfaces/cart';
import {StyledList} from './PurchaseHistoryDialog.styles';
interface Props {
	showDialog: boolean;
	handleClose: ()=>void;
	items: Array<IOrder>;
}

const PurchaseHistoryDialog: React.FC<Props> = (props) =>{
	const { items, showDialog, handleClose } = props;
	return(
		<Dialog open={showDialog} 
				onClose={handleClose}
				aria-labelledby="order-history-dialog-title"
				aria-describedby="order-history-dialog-description">
			<DialogTitle id="order-history-dialog-title">
				{"Purchase History"}
			</DialogTitle>
				{items.length >0?
					<StyledList>
						{items.map((item: IOrder) =>(
							<ListItem key={item.id}>
								{item.items.map((item:IOrderItem) => (
									<ListItemText key={item.id} primary={`${item.id} x ${item.amount}`} />
								))}
								<ListItemText primary= {`Total Price: ${item.totalPrice}`}/>
							</ListItem>
						))}
					</StyledList>
					:
					<DialogContent>
						<DialogContentText id="order-history-dialog-description">
							No Purchase History Found
						</DialogContentText>
					</DialogContent>
				}
		</Dialog>
	)
}

export default PurchaseHistoryDialog;