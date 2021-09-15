import React, { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import CheeseCard from '../component/CheeseCard/CheeseCard';
import Cart from '../component/Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RestoreIcon from '@material-ui/icons/Restore';
import Badge from '@material-ui/core/Badge';
// Styles
import { Wrapper, StyledButton, StyledAppBar, HeaderTypography } from './main.styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

//Types
import {ICartItem} from '../interfaces/cart';

const getCheeses = async (): Promise<ICartItem[]> =>
	await (await fetch(`api/cheeses`)).json();

const Main = () => {
	const [cartOpen, setCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([] as ICartItem[]);
	const { data, isLoading, error } = useQuery<ICartItem[]>(
		'cheeses',
		getCheeses
	);
	const [showDetail, setShowDetail] = useState< boolean | null>(false);
	console.log(data);

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

	if (isLoading) return <LinearProgress />;
	if (error) return <div>Something went wrong ...</div>;

	const handleClickCard = () => {
		setShowDetail(prevState => !prevState);
		console.log(showDetail)
	}

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
			<StyledButton>
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
			removeFromCart={handleRemoveFromCart}
		/>
		</Drawer>

		<Grid container spacing={3}>
		{data?.map(item => (
			<Grid item key={item.id} xs={12} sm={4}>
			<CheeseCard item={item} handleAddToCart={handleAddToCart} handleClickCard={handleClickCard}/>
			</Grid>
		))}
		</Grid>
	</Wrapper>
	);
};

export default Main;