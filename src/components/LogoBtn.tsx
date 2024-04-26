import styled from "styled-components";
import message from "./message";

const Wrapper = styled.button`
  margin-top: 50px;
	background-color: transparent;
	border: none;
	cursor: pointer;
	display: flex;
	align-items: center;

`;

const Text = styled.span`
	color: #0000007a;
	font-size: 43px; 
  font-weight: bold; 
  margin-right: 11px;

`;

const GradientText = styled.span`
	background: linear-gradient(
		90deg,
		#6a4c93 0%,
		#1982c4 20%,
		#8ac926 40%,
		#ffca3a 60%,
		#ff595e 80%
	);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	font-size: 45px;
	font-weight: bold; 
`;

interface LogoBtnProps {
	onClick: () => void;
}

const LogoBtn = (props: LogoBtnProps) => {

	return (
		<Wrapper onClick={props.onClick}>
			<Text>{message.LOGO_TEXT} </Text>
			<GradientText>{message.LOGO}</GradientText>
		</Wrapper>
	);
};

export default LogoBtn;