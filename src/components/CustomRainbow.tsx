import React, { useState } from 'react';
import styled, { css, keyframes } from "styled-components";

// 애니메이션 회전
const rotate = keyframes`
  from { transform: rotate(-180deg); }
  to { transform: rotate(0deg); }
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

// 전체 영역
const Wrapper = styled.div`
	width: calc(37.5px * 18);
	height: calc(37.5px * 9.1);
	position: relative;
	overflow: hidden;
  margin: auto; 
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

const CustomRainbow = () => {

  const routine = JSON.parse(window.localStorage.getItem("routines") || "[]");


  // 사용자에게 입력받을 타이머 시간과 색상
	const duration1 = routine[0].totalSeconds;
	const duration2 = routine[1].totalSeconds;
	const duration3 = routine[2].totalSeconds;
	const duration4 = routine[3] && routine[3].totalSeconds;
	const duration5 = routine[4] && routine[4].totalSeconds;

	const color1 = routine[0].color;
	const color2 = routine[1].color;
	const color3 = routine[2].color;
	const color4 = routine[3] && routine[3].color;
	const color5 = routine[4] && routine[4].color;


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
      </CenteredContainer>
		</>
	);
};

export default CustomRainbow;
