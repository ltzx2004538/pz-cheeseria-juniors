import Button from '@material-ui/core/Button';
// Types
import { ICartItem } from '../../../interfaces/cart';
// Styles
import { Wrapper } from './CartItem.styles';

interface Props {
	item: ICartItem;
	addToCart: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, clickedItem: ICartItem) => void;
	removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
	<Wrapper>
		<div>
			<h3>{item.title}</h3>
			<div className='information'>
				<p>Price: ${item.price}</p>
				<p>Total: ${(item.amount * item.price).toFixed(2)}</p>
			</div>
			<div className='buttons'>
				<Button
					size='small'
					disableElevation
					variant='contained'
					onClick={() => removeFromCart(item.id)}
				>
					-
				</Button>
				<p>{item.amount}</p>
				<Button
					size='small'
					disableElevation
					variant='contained'
					onClick={(e) => addToCart(e,item)}
				>
					+
				</Button>
			</div>
		</div>
		<img src={item.image} alt={item.title} />
	</Wrapper>
);

export default CartItem;
