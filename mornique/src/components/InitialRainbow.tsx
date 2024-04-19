import React from "react";
import styled, { css, keyframes } from "styled-components";

// 애니메이션 회전
const rotate = keyframes`
  from { transform: rotate(-180deg); }
  to { transform: rotate(0deg); }
`;

// 전체 영역
const Wrapper = styled.div`
	width: calc(37.5px * 18);
	height: calc(37.5px * 9.1);
	border: 1px solid #000000;
	position: relative;
	overflow: hidden;
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

const InitialRainbow: React.FC = () => {
  // 사용자에게 입력받을 타이머 시간과 색상
	const duration1 = 0.8;
	const duration2 = 1.1;
	const duration3 = 1.4;
	const duration4 = 1.7;
	const duration5 = 2;

	const color1 = "#6A4C93";
	const color2 = "#1982C4";
	const color3 = "#8AC926";
	const color4 = "#FFCA3A";
	const color5 = "#FF595E";

	return (
		<>
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
		</>
	);
};

export default InitialRainbow;
