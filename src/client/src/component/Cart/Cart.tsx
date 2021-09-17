import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { ICartItem } from '../../interfaces/cart';

type Props = {
	cartItems: ICartItem[];
	addToCart: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, clickedItem: ICartItem) => void;
	removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
	const calculateTotal = (items: ICartItem[]) =>
		items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

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
			<h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
		</Wrapper>
	);
};

export default Cart;