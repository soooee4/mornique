import React, { useState, useEffect } from "react";
import { start } from "repl";
import styled, { css, keyframes } from "styled-components";

interface Routine {
	name: string;
	totalSeconds: number;
	color: string;
}

interface ReadyTimerProps {
	show: boolean;
}

// rotate 애니메이션 키 프레임 정의
const rotate = keyframes`
  from { transform: rotate(-180deg); }
  to { transform: rotate(0deg); }
`;

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

// TaskText 스타일 정의
const LeftTimeText = styled.p`
	display: block;
	font-size: 25px;
`;

const ReadyTimer = styled.span<ReadyTimerProps>`
	font-size: 50px;
	color: black;
	display: ${(props) => (props.show ? "block" : "none")};
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

const CustomRainbow = (props: any) => {
	// 로컬 스토리지에 저장된 routine값
	const routine: Routine[] = JSON.parse(window.localStorage.getItem("routines") || "[]");

	const [newRoutine, setNewRoutine] = useState<Routine[]>([routine[0]] || []);
	const [currentRoutineIndex, setCurrentRoutineIndex] = useState(0); // 처리중인 현재 루틴의 인덱스

	const [timeLeft, setTimeLeft] = useState(
		newRoutine[currentRoutineIndex]
			? newRoutine[currentRoutineIndex].totalSeconds * 1000
			: 0
	);

	const [readyTime, setReadyTime] = useState(5); // 루틴 시작 전 5초 타이머
	const [isShow, setIsShow] = useState(true); // 5초 타이머 노출 여부
	const [animationKey, setAnimationKey] = useState(0); // 사용자 설정 타이머 시작 여부

	useEffect(() => {
		const interval = setInterval(() => {
			setReadyTime((currentReadyTime) => {
				if (currentReadyTime <= 1) {
					clearInterval(interval); 
					setTimeout(() => setIsShow(false), 1000);
					return 0;
				}
				return currentReadyTime - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		let timer: number | undefined;

		if (timeLeft > 0 && !isShow) {
			timer = window.setInterval(() => {
				setTimeLeft((prevTime) => prevTime - 1000);
			}, 1000);
		} else if (timeLeft <= 0) {
			if (timer) clearInterval(timer);
			if (currentRoutineIndex < routine.length - 1) {
				goToNextRoutine();
			} else {
				// 모든 루틴 완료되면 실행할 동작 추가하기
				// props.setState();
			}
		}
		return () => {
			if (timer) clearInterval(timer);
		};
	}, [timeLeft, isShow, currentRoutineIndex]);

	// 다음 task 실행하는 함수
	const goToNextRoutine = () => {
		if (currentRoutineIndex < routine.length - 1) {
			setNewRoutine([...newRoutine, routine[currentRoutineIndex + 1]]);
			setCurrentRoutineIndex(currentRoutineIndex + 1);
			setTimeLeft(routine[currentRoutineIndex + 1].totalSeconds * 1000);
			setAnimationKey((prevKey) => prevKey + 1);
		}
	};

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
				<ReadyTimer show={isShow}>
					{readyTime > 0 ? readyTime : "Start!"}
				</ReadyTimer>
				<Wrapper>
					{!isShow && (
						<>
							{newRoutine.map((item, index) => (
								<RainbowDiv
									key={index + animationKey}
									customDuration={item.totalSeconds}
									customColor={item.color}
									width={[33.3, 50, 66.6, 83.3, 100][index]}
									height={`calc(37.5px * ${[3, 4.5, 6, 7.6, 9.1][index]})`}
									left={[33.35, 25, 16.7, 8.35, 0][index]}
									zIndex={newRoutine.length - index}
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
						</>
					)}
				</Wrapper>
				<TaskText>
					{newRoutine[currentRoutineIndex].name}
				</TaskText>
				<LeftTimeText>for {formatTime(timeLeft)}</LeftTimeText>
        <button>pause</button>
			</CenteredContainer>
		</>
	);
};

export default CustomRainbow;
