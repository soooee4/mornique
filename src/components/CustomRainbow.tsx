import React, { useState, useEffect, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import StartTimerBtn from "./StartTimerBtn";

interface Routine {
	name: string;
	totalSeconds: number;
	color: string;
}

interface ReadyTimerProps {
	show: boolean;
}

interface PauseButtonProps {
	isVisible: boolean;
}

interface CustomRainbowProps {
  setState: () => void;
  setLogoText: () => void;
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
	min-width: calc(37.5px * 18);
	height:  100vh;           
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

const TaskText = styled.p`
	display: block;
	font-size: 28px;
	font-weight: bold;
	color: ${(props) => props.color};
	margin-top: 70px;
`;

const LeftTimeText = styled.p`
	color: #1919199c;
	display: block;
	font-size: 22px;
	font-weight: bold;
	margin-top: 10px;
`;

// 소요 시간, 일시정지 버튼 배치를 위한 div
const Info = styled.div`
	display: flex;
	justify-content: center;
	margin-top: -20px;
`;

const ReadyTimer = styled.span<ReadyTimerProps>`
	font-size: 50px;
	color: black;
	display: ${(props) => (props.show ? "block" : "none")};
`;

// 일시정지 버튼
const PauseButton = styled.button<PauseButtonProps>`
	visibility: ${(props) => !props.isVisible && "hidden"};
	border-radius: 50%;
	padding: 4px 6px;
	border: none;
	background-color: transparent;
	cursor: pointer;
	min-width: 40px;
	height: 40px;
	font-size: 20px;
	color: #777777;
	&:hover {
		background-color: #f0f0f0;
		color: #383838;
	}
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
	isLast?: boolean;
}>`
	border-radius: 375px 375px 0 0;
	position: absolute;
	bottom: 0;
	transform-origin: bottom center;
	animation: ${(props) =>
		!props.noRotate
			? css`
					${rotate} ${props.customDuration}s linear ${props.isLast
						? "forwards"
						: "infinite"}
			  `
			: "none"};
	transform: ${(props) => (props.noRotate ? "rotate(0)" : "rotate(-180deg)")};
	width: ${(props) => props.width}%;
	height: ${(props) => props.height};
	left: ${(props) => (props.left ? `${props.left}%` : 0)};
	background-color: ${(props) => props.customColor};
	z-index: ${(props) => props.zIndex};
`;

const CustomRainbow = (props: CustomRainbowProps) => {
	// 로컬 스토리지에 저장된 routine값
	const routine: Routine[] = JSON.parse(
		window.localStorage.getItem("routines") || "[]"
	);
	// 첫 번째 루틴을 시작으로 새 루틴 배열 설정
	const [newRoutine, setNewRoutine] = useState<Routine[]>([routine[0]] || []);
	// 처리중인 현재 루틴의 인덱스
	const [currentRoutineIndex, setCurrentRoutineIndex] = useState(0);
	// 각 task의 남은 시간
	const [timeLeft, setTimeLeft] = useState(
		newRoutine[currentRoutineIndex]
			? newRoutine[currentRoutineIndex].totalSeconds * 1000
			: 0
	);
	// 루틴 시작 전 준비 시간(5초)
	const [readyTime, setReadyTime] = useState(3);
	// ReadyTimer 노출 여부
	const [isShow, setIsShow] = useState(true);
	// 애니메이션 조작
	const [animationKey, setAnimationKey] = useState(0);
	// 타이머 일시정지 여부
	const [isPause, setIsPause] = useState(false);
	// 애니메이션 참조 배열 초기화
	const animationRefs = useRef<Array<HTMLDivElement | null>>([]);

	// 일시정지 상태가 바뀔 때마다 애니메이션 재생 여부 관리
	useEffect(() => {
		if (isPause) {
			animationRefs.current.forEach((el) => {
				if (el) el.style.animationPlayState = "paused";
			});
		} else {
			animationRefs.current.forEach((el) => {
				if (el) el.style.animationPlayState = "running";
			});
		}
	}, [isPause]);

	// 일시정지 버튼 노출 제어
	const togglePause = () => {
		setIsPause(!isPause);
	};

	// ReadyTimer  (1초마다 감소)
	useEffect(() => {
		const interval = setInterval(() => {
			if (!isPause && isShow) {
				if (readyTime > 1) {
					setReadyTime(readyTime - 1);
				} else if (readyTime === 1) {
					setReadyTime(0);
					setTimeout(() => setIsShow(false), 900);
				}
			}
		}, 900);

		return () => clearInterval(interval);
	}, [isShow, isPause, readyTime]);

	// 각 task 타이머
	useEffect(() => {
		let timer: number | undefined;

		// 남은 시간이 0보다 크고 ReadyTimer가 비노출 상태일 경우
		if (timeLeft > 0 && !isShow) {
			// 일시 정지 상태가 아닐 때
			if (!isPause) {
				// 1초마다 남은 시간을 1초 감소시킴
				timer = window.setInterval(() => {
					setTimeLeft((prevTime) => prevTime - 1000);
				}, 1000);
			}
			// 남은 시간이 0 이하인 경우 (현재 task 시간이 종료된 경우)
		} else if (timeLeft <= 0) {
			// 설정된 타이머가 있으면 해당 타이머 제거
			if (timer) clearInterval(timer);
			// 루틴의 마지막 task가 아니라면 다음 루틴으로 이동
			if (currentRoutineIndex < routine.length - 1) {
				goToNextRoutine();
			} else {
				// * 모든 루틴 완료되면 실행할 동작 추가하기
				// props.setState(); 등의 완료 처리 로직
        setInterval(() => {
          props.setLogoText();
         
        }, 1000)
			}
		}
		return () => {
			if (timer) clearInterval(timer);
		};
	}, [timeLeft, isShow, isPause, currentRoutineIndex]);

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
				<Wrapper>
					<ReadyTimer show={isShow}>
						{readyTime > 0 ? readyTime : "START"}
					</ReadyTimer>
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
									isLast={index === newRoutine.length - 1}
									ref={(el) => (animationRefs.current[index] = el)}
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
				{/* 현재 task명 (routine.name)*/}
				<TaskText color={newRoutine[currentRoutineIndex].color}>
					{newRoutine[currentRoutineIndex].name}
				</TaskText>
				{/* <Info> */}
				<LeftTimeText>for {formatTime(timeLeft)}</LeftTimeText>
				{/* 일시 정지/재생 버튼(타이머가 진행 중일 때만 노출) */}
				<PauseButton
					onClick={togglePause}
					isVisible={
						!isShow &&
						currentRoutineIndex === newRoutine.length - 1 &&
						timeLeft > 0
					}
				>
					{isPause ? "▶" : "❚❚"}
				</PauseButton>
				{/* </Info> */}
			</CenteredContainer>
		</>
	);
};

export default CustomRainbow;
