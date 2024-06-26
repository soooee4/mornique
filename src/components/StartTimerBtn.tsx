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

const GradientText = styled.span<GradientTextProps>`
	letter-spacing: 2px;
	background: ${(props) => props.gradient};
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	font-size: 45px;
	font-weight: bold;
`;

interface StartTimerBtnProps {
	onClick?: () => void;
	logoText?: string;
}

interface GradientTextProps {
	gradient: string;
}

const StartTimerBtn = (props: StartTimerBtnProps) => {
	const routine = JSON.parse(window.localStorage.getItem("routines") || "[]");

	const gradient = `linear-gradient(90deg, ${routine
		.map(
			(item: any, index: number) =>
				`${item.color || "#FFFFFF"} ${index * (100 / routine.length)}%`
		)
		.join(", ")})`;

	return (
		<Wrapper onClick={props.logoText === "start" ? props.onClick : undefined}>
			{props.logoText === "start" ? (
				<>
					<Text>{message.START_TIMER_TEXT} </Text>
					<GradientText gradient={gradient}>{message.LOGO}</GradientText>
				</>
			) : (
				<GradientText gradient={gradient}>{message.FINISH_TEXT}</GradientText>
			)}
		</Wrapper>
	);
};

export default StartTimerBtn;
