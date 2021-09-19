import { withStyles } from '@material-ui/styles';
import styled from 'styled-components';
import {Button} from '../Button/Button';

export const Wrapper = styled.aside`
	font-family: Arial, Helvetica, sans-serif;
	width: 500px;
	padding: 20px;
`;

export const CheckOutBtn = styled(Button)`
	width: 100px;
	height: 50px;
	background-color: #e0e0e0;
	border-radius: 5px;

	&:active {
		background-color: #ffffff;
	}
`
