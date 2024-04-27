import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";

interface Routine {
	name: string;
	totalSeconds: number;
	color: string;
}

// CenteredContainer 스타일 정의
const CenteredContainer = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100vw;
	min-width: calc(37.5px * 18);
	overflow: hidden;
`;

// Wrapper 스타일 정의
const Wrapper = styled.div`
	min-width: calc(37.5px * 18);
	height: calc(37.5px * 9.1);
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
`;

// TaskText 스타일 정의
const TaskText = styled.p`
	display: block;
	font-size: 25px;
`;

// rotate 애니메이션 키 프레임 정의
const rotate = keyframes`
  from { transform: rotate(-180deg); }
  to { transform: rotate(0deg); }
`;

// RainbowDiv 스타일 정의
const RainbowDiv = styled.div<{
	customDuration: number;
	customColor: string;
	width: number;
	height: string;
	left?: number;
	zIndex: number;
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
	z-index: ${(props) => props.zIndex};
`;

const CustomRainbow = () => {
	const routine: Routine[] = JSON.parse(
		window.localStorage.getItem("routines") || "[]"
	);
	const [currentRoutineIndex, setCurrentRoutineIndex] = useState(0); // 처리중인 현재 루틴의 인덱스
	const [timeLeft, setTimeLeft] = useState(
		routine[currentRoutineIndex]
			? routine[currentRoutineIndex].totalSeconds * 1000
			: 0
	);
	const [content, setContent] = useState("");

	useEffect(() => {
		// 현재 루틴의 남은 시간이 0 이하이고 마지막 루틴이 아니라면 다음 루틴으로 넘어감
		if (timeLeft <= 0 && currentRoutineIndex < routine.length - 1) {
			setCurrentRoutineIndex(currentRoutineIndex + 1);
			setTimeLeft(routine[currentRoutineIndex + 1].totalSeconds * 1000);
			setContent(routine[currentRoutineIndex + 1].name);
		}
	}, [timeLeft, currentRoutineIndex, routine]);

	// 남은 시간 업데이트
	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prevTime) => prevTime - 1000);
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	// 밀리초 단위의 시간을 분:초 형식으로 변환
	const formatTime = (ms: number) => {
		const seconds = Math.floor(ms / 1000) % 60;
		const minutes = Math.floor(ms / 60000);
		return `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`;
	};

	return (
		<>
			<CenteredContainer>
				<Wrapper>
					{routine.map((item, index) => (
						<RainbowDiv
							key={index}
							customDuration={item.totalSeconds}
							customColor={item.color}
							width={[33.3, 50, 66.6, 83.3, 100][index]}
							height={`calc(37.5px * ${[3, 4.5, 6, 7.6, 9.1][index]})`}
							left={[33.35, 25, 16.7, 8.35, 0][index]}
							zIndex={routine.length - index}
							noRotate={index !== currentRoutineIndex}
						/>
					))}
					<RainbowDiv
						customDuration={0}
						customColor="white"
						width={16}
						height="calc(37.5px * 1.5)"
						left={42}
						noRotate={true}
						zIndex={999}
					/>
				</Wrapper>
				<TaskText>
					{/* {currentRoutineIndex < routine.length
						? routine[currentRoutineIndex].name
						: "완료"} */}
				</TaskText>
				{/* <StartTimerBtn onClick={() => setCurrentRoutineIndex(0)} /> */}
			</CenteredContainer>
		</>
	);
};

export default CustomRainbow;
