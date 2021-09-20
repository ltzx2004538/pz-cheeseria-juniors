import styled, {css} from 'styled-components';
import {Button} from '../Button/Button';

export const Wrapper = styled.aside`
	font-family: Arial, Helvetica, sans-serif;
	width: 500px;
	padding: 20px;
`;

interface CheckOutProps {
	isDisabled: boolean
}
export const CheckOutBtn = styled(Button)<CheckOutProps>`
	width: 100px;
	height: 50px;
	background-color: #e0e0e0;
	border-radius: 5px;
	cursor: not-allowed;
	${(props: CheckOutProps) => !props.isDisabled && css`
		cursor: pointer;
		&:hover {
			background-color: #adb3b8}
		}
		&:active {
			background-color: #ffffff;
		}
	`}
`
