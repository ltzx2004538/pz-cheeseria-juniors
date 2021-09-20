import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
// Components
import CheeseCard from '../component/CheeseCard/CheeseCard';
import Cart from '../component/Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RestoreIcon from '@material-ui/icons/Restore';
import Badge from '@material-ui/core/Badge';
import MessageDialog from '../component/MessageDialog';
import PurchaseHistoryDialog from '../component/PurchaseHistoryDialog';
// Styles
import { Wrapper, StyledButton, StyledAppBar, HeaderTypography } from './main.styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

//Types
import {ICartItem} from '../interfaces/cart';
import { ORDER_STATUS } from '../utils/constant';

interface State {
	order: any
}

const getCheeses = async (): Promise<ICartItem[]> =>
	await (await fetch(`api/cheeses`)).json();

const Main = () => {
	const [cartOpen, setCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([] as ICartItem[]);
	const { data, isLoading, error } = useQuery<ICartItem[]>(
		'cheeses',
		getCheeses
	);
	const [confirmMessage, setConfirmMessage] = useState("")
	const [showMessage, setShowMessage] = useState(false);
	const [showHistory, setShowHistory] = useState(false);
	const dispatch = useDispatch();
	const orders = useSelector((state: State) => state.order.orders);
	const isOrderReceived = useSelector((state: any) => state.order.isOrderReceived);

	useEffect(()=>{
		if(isOrderReceived === ORDER_STATUS.SUCCEED) {
			setConfirmMessage("Check out succeed");
			setShowMessage(true);
		}
		else if (isOrderReceived === ORDER_STATUS.FAILED) {
			setConfirmMessage("Check out failed");
			setShowMessage(true);
		}
	},[isOrderReceived])

	useEffect(()=>{
		if(showHistory == true){
			dispatch({
				type: "GET_ORDER"
			});
		}
	},[showHistory]);

	const getTotalItems = (items: ICartItem[]) =>
		items.reduce((ack: number, item) => ack + item.amount, 0);

	const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, clickedItem: ICartItem) => {
		e.stopPropagation();
		setCartItems(prev => {
			// 1. Is the item already added in the cart?
			const isItemInCart = prev.find(item => item.id === clickedItem.id);

			if (isItemInCart) {
			return prev.map(item =>
				item.id === clickedItem.id
				? { ...item, amount: item.amount + 1 }
				: item
			);
			}
			// First time the item is added
			return [...prev, { ...clickedItem, amount: 1 }];
		});
	};

	const handleRemoveFromCart = (id: number) => {
		setCartItems(prev =>
			prev.reduce((ack, item) => {
			if (item.id === id) {
				if (item.amount === 1) return ack;
				return [...ack, { ...item, amount: item.amount - 1 }];
			} else {
				return [...ack, item];
			}
			}, [] as ICartItem[])
		);
	};

	const closeCart = ()=> {
		setCartOpen(false);
	}
	const clearCartItems = () => {
		setCartItems([]);
	}

	const handleCloseMessage =() =>{
		setShowMessage(false);
	}

	const handleHistoryDialog = (isShow: boolean)=> {
		setShowHistory(isShow);
	}

	const memoHistory = useCallback((show)=>handleHistoryDialog(show),[showHistory]);

	if (isLoading) return <LinearProgress />;
	if (error) return <div>Something went wrong ...</div>;
	return (
	<Wrapper>
		<StyledAppBar position="static">
		<Toolbar>
			<Grid
			container
			direction="row"
			justify="space-between"
			alignItems="center"
			>
			<StyledButton onClick={()=>handleHistoryDialog(true)}>
				<RestoreIcon />
				<Typography variant="subtitle2">
				Recent Purchases
				</Typography>
			</StyledButton>

			<HeaderTypography variant="h3" noWrap>
				Welcome to Patient Zero's Cheeseria
			</HeaderTypography>

			<StyledButton onClick={() => setCartOpen(true)}>
				<Badge
				badgeContent={getTotalItems(cartItems)}
				color='error'
				data-cy="badge-count">
				<AddShoppingCartIcon />
				</Badge>

				<Typography variant="subtitle2">
				Cart
				</Typography>
			</StyledButton>

			</Grid>
		</Toolbar>
		</StyledAppBar>

		<Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
		<Cart
			cartItems={cartItems}
			addToCart={handleAddToCart}
			closeCart={closeCart}
			clearCartItems={clearCartItems}
			removeFromCart={handleRemoveFromCart}
		/>
		</Drawer>

		<Grid container spacing={3}>
		{data?.map(item => (
			<Grid item key={item.id} xs={12} sm={4}>
				<CheeseCard item={item} handleAddToCart={handleAddToCart}/>
			</Grid>
		))}
		</Grid>
		{showMessage&&
			<MessageDialog message= {confirmMessage} isDialogShow= {showMessage} handleCloseDialog={handleCloseMessage}/>
		}
		{showHistory &&
			<PurchaseHistoryDialog showDialog= {showHistory} handleClose={()=>memoHistory(false)} items={orders}/>
		}
	</Wrapper>
	);
};

export default Main;