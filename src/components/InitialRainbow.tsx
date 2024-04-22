import React from "react";
import styled, { css, keyframes } from "styled-components";
import LogoText from "./LogoBtn";
import LogoBtn from "./LogoBtn";

const CenteredContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100vw;
	min-width: calc(37.5px * 18);
	overflow: hidden;
`;

// 전체 영역
const Wrapper = styled.div`
	min-width: calc(37.5px * 18);
	height: calc(37.5px * 9.1);
	position: relative;
	/* margin: auto;  */
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
`;

// 애니메이션 회전
const rotate = keyframes`
  from { transform: rotate(-180deg); }
  to { transform: rotate(0deg); }
`;

// 무지개 영역
const RainbowDiv = styled.div<{
	customDuration: number;
	customColor: string;
	width: number;
	height: string;
	left?: number;
	noRotate?: boolean;
}>`
	border-radius: 375px 375px 0 0;
	position: absolute;
	bottom: 0;
	transform-origin: bottom center;
	animation: ${(props) =>
		!props.noRotate
			? css`
					${rotate} ${props.customDuration}s forwards
			  `
			: "none"};
	transform: ${(props) => (props.noRotate ? "rotate(0)" : "rotate(-180deg)")};
	width: ${(props) => props.width}%;
	height: ${(props) => props.height};
	left: ${(props) => (props.left ? `${props.left}%` : 0)};
	background-color: ${(props) => props.customColor};
`;

const InitialRainbow = (props: any) => {
	// 첫 화면 색상, 애니메이션 고정값
	const duration1 = 1.2;
	const duration2 = 1.7;
	const duration3 = 2.2;
	const duration4 = 2.6;
	const duration5 = 3.1;

	const color1 = "#6A4C93";
	const color2 = "#1982C4";
	const color3 = "#8AC926";
	const color4 = "#FFCA3A";
	const color5 = "#FF595E";

	return (
		<>
			<CenteredContainer>
				<Wrapper>
					<RainbowDiv
						customDuration={duration5}
						customColor={color5}
						width={100}
						height="calc(37.5px * 9.1)"
					/>
					<RainbowDiv
						customDuration={duration4}
						customColor={color4}
						width={83.3}
						height="calc(37.5px * 7.6)"
						left={8.35}
					/>
					<RainbowDiv
						customDuration={duration3}
						customColor={color3}
						width={66.6}
						height="calc(37.5px * 6)"
						left={16.7}
					/>
					<RainbowDiv
						customDuration={duration2}
						customColor={color2}
						width={50}
						height="calc(37.5px * 4.5)"
						left={25}
					/>
					<RainbowDiv
						customDuration={duration1}
						customColor={color1}
						width={33.3}
						height="calc(37.5px * 3)"
						left={33.35}
					/>
					<RainbowDiv
						customDuration={duration1}
						customColor="white"
						width={16}
						height="calc(37.5px * 1.5)"
						left={42}
						noRotate={true}
					/>
				</Wrapper>
				<LogoBtn onClick={props.onClick} />
			</CenteredContainer>
		</>
	);
};

export default InitialRainbow;
