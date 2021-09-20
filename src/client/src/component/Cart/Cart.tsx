import React, {useState, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem/CartItem';
import { Wrapper, CheckOutBtn} from './Cart.styles';
import { ICartItem, IOrderItem} from '../../interfaces/cart';
import {ORDER_STATUS} from '../../utils/constant';

type Props = {
	cartItems: ICartItem[];
	addToCart: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, clickedItem: ICartItem) => void;
	closeCart: ()=> void;
	clearCartItems: ()=> void;
	removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = (props) => {
	const { cartItems, addToCart, removeFromCart, closeCart, clearCartItems} = props;
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const isBtnLock = useRef(true);
	const dispatch = useDispatch();
	const isOrderReceived = useSelector((state: any) => state.order.isOrderReceived);
	
	useEffect(()=> {
		if(cartItems.length == 0) {
			isBtnLock.current = true;
		}
		else {
			isBtnLock.current = false;
		}
		const total = calculateTotal(cartItems);
		setTotalPrice(total);
	},[cartItems]);

	useEffect(()=>{
		if(isOrderReceived === ORDER_STATUS.SUCCEED) {
			closeCart();
			clearCartItems();
			dispatch({
				type: 'ORDER_RECEIVED',
				payload: ORDER_STATUS.PENDING
			});
		}
		else if (isOrderReceived === ORDER_STATUS.FAILED) {
			console.log('check out failed');
		}
	},[isOrderReceived])
	
	const calculateTotal = (items: ICartItem[]) => {
		return items.reduce((ack: number, item) => ack + item.amount * item.price, 0)
	}

	const handleCheckOut = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
		e.stopPropagation();
		isBtnLock.current = true;
		const orderItems: Array<IOrderItem> = [];
		if (cartItems.length > 0) {
			cartItems.map(item => {
				const orderItem: IOrderItem = {id: item.id, amount: item.amount};
				orderItems.push(orderItem);
			});
			dispatch({
				type: 'CREATE_ORDER',
				payload: {
					items: orderItems,
					amount: totalPrice
				}
			});
		};
	}

	return (
		<Wrapper>
			<h2>Your Shopping Cart</h2>
			{cartItems.length === 0 ? <p>No items in cart.</p> : null}
			{cartItems.map(item => (
				<CartItem
					key={item.id}
					item={item}
					addToCart={addToCart}
					removeFromCart={removeFromCart}
				/>
			))}
			<h2>Total: ${totalPrice.toFixed(2)}</h2>
			<CheckOutBtn isDisabled={isBtnLock.current} disabled={isBtnLock.current} onClick={e=>handleCheckOut(e)}> Check Out </CheckOutBtn>
		</Wrapper>
	);
};

export default Cart;
