import React from "react";
import styled from 'styled-components';

interface Avatar {
	imgUrl: string;
	name: string;
}

const Image = styled.img`
	display: block;
	width: auto;
	height: 150px;
	object-fit: contain;
`;

const Wrapper = styled.div`
	box-sizing: border-box;
	border: 1px solid #ddd;
	margin: 20px;
`

const Avatar:React.FC<Avatar> = (props) => {
	const {imgUrl,name} = props;
	return(
		<Wrapper>
			<Image src={imgUrl} alt={name}/>
		</Wrapper>
	)
}
export default Avatar;
