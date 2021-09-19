import React, {useState, useEffect} from 'react';
import CartItem from './CartItem/CartItem';
import { Wrapper, CheckOutBtn} from './Cart.styles';
import { ICartItem } from '../../interfaces/cart';

type Props = {
	cartItems: ICartItem[];
	addToCart: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, clickedItem: ICartItem) => void;
	removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
	const [totalPrice, setTotalPrice] = useState<number>(0);

	useEffect(()=> {
		const total = calculateTotal(cartItems);
		setTotalPrice(total);
	},[cartItems]);
	
	const calculateTotal = (items: ICartItem[]) => {
		return items.reduce((ack: number, item) => ack + item.amount * item.price, 0)
	}

	const handleCheckOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
		e.stopPropagation();
		console.log(cartItems);
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
			<CheckOutBtn onClick={e=>handleCheckOut(e)}> Check Out </CheckOutBtn>
		</Wrapper>
	);
};

export default Cart;
