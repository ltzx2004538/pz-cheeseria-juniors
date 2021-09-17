import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
//UI
import DetailDialog from './component/DetailDialog';
// Types
import { ICartItem } from '../../interfaces/cart';
// Styles
import { Wrapper } from './CheeseCard.styles';

type Props = {
	item: ICartItem;
	handleAddToCart: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, clickedItem: ICartItem) => void;
};

const CheeseCard: React.FC<Props> = ({ item, handleAddToCart}) => {
	const [showDetail, setShowDetail] = useState< boolean>(false);

	const handleClickCard = () => {
		setShowDetail(prevState => !prevState);
		console.log(showDetail)
	}

	return (
		<Wrapper onClick= {handleClickCard}>
			<img src={item.image} alt={item.title} />
			<div>
				<h3>{item.title}</h3>
				<h3>${item.price}</h3>
			</div>
			<Button
				onClick={(e) => handleAddToCart(e,item)}
				data-cy={`add-to-cart-${item.id}`}>Add to cart</Button>
				{showDetail &&
					<DetailDialog open={showDetail} item={item} handleClose={handleClickCard}/>
				}
		</Wrapper>
	)
};

export default CheeseCard;
