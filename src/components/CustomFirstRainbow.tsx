import React from "react";
import styled, { css, keyframes } from "styled-components";
import StartTimerBtn from "./StartTimerBtn";

interface Routine {
	name: string;
	totalSeconds: number;
	color: string;
}

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

const Wrapper = styled.div`
	min-width: calc(37.5px * 18);
	height: calc(37.5px * 9.1);
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
`;

const rotate = keyframes`
  from { transform: rotate(-180deg); }
  to { transform: rotate(0deg); }
`;

const RainbowDiv = styled.div<{
	customDuration: number;
	customColor: string;
	width: number;
	height: string;
	left?: number;
	noRotate?: boolean;
	zIndex: number;
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
	z-index: ${(props) => props.zIndex};
`;

// const rainbows = [
//   { customDuration: 3.1, customColor: "#6A4C93", width: 100, height: "calc(37.5px * 9.1)" },
//   { customDuration: 2.6, customColor: "#1982C4", width: 83.3, height: "calc(37.5px * 7.6)", left: 8.35 },
//   { customDuration: 2.2, customColor: "#8AC926", width: 66.6, height: "calc(37.5px * 6)", left: 16.7 },
//   { customDuration: 1.7, customColor: "#FFCA3A", width: 50, height: "calc(37.5px * 4.5)", left: 25 },
//   { customDuration: 1.2, customColor: "#FF595E", width: 33.3, height: "calc(37.5px * 3)", left: 33.35 },
//   { customDuration: 0, customColor: "white", width: 16, height: "calc(37.5px * 1.5)", left: 42, noRotate: true }
// ];

const CustomFirstRainbow = (props: any) => {
	const routine: Routine[] = JSON.parse(
		window.localStorage.getItem("routines") || "[]"
	);

	return (
		<>
			<CenteredContainer>
				<Wrapper>
					{routine.map((item, index) => (
						<RainbowDiv
							key={index}
							customDuration={[1.2, 1.7, 2.3, 2.8, 3.3][index]}
							customColor={item.color}
							width={[33.3, 50, 66.6, 83.3, 100][index]}
							height={`calc(37.5px * ${[3, 4.5, 6, 7.6, 9.1][index]})`}
							left={[33.35, 25, 16.7, 8.35, 0][index]}
							zIndex={routine.length - index}
						/>
					))}
					<RainbowDiv
						customDuration={0}
						customColor="white"
						width={16}
						height="calc(37.5px * 1.5)"
						left={42}
						zIndex={999}
					/>
				</Wrapper>
        <StartTimerBtn />
			</CenteredContainer>
		</>
	);
};

export default CustomFirstRainbow;
