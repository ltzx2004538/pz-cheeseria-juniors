import Button from '@material-ui/core/Button';
// Types
import { ICartItem } from '../../../interfaces/cart';
// Styles
import { Wrapper } from './Item.styles';

type Props = {
  item: ICartItem;
  handleAddToCart: (clickedItem: ICartItem) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>
      <h3>${item.price}</h3>
    </div>
    <Button
      onClick={() => handleAddToCart(item)}
      data-cy={`add-to-cart-${item.id}`}>Add to cart</Button>
  </Wrapper>
);

export default Item;
