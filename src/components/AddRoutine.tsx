import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getRandomColor } from "../util";
import message from "./message";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* style 정의 */

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	box-sizing: border-box;
	flex-direction: column;
	height: 100%;
`;

const MainContent = styled.div`
	flex-grow: 1;
`;

const InputContainer = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	flex-direction: row;

	@media (max-width: 1000px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

const FlexContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-left: auto;
	justify-content: flex-end;

	@media (max-width: 1000px) {
		margin-top: 10px;
	}
`;

// 사용자 task 입력
const Input = styled.input`
	box-sizing: border-box;
	font-size: 17px;
	flex-grow: 1;
	width: 100%;
	padding: 12px;
	margin-right: 20px;
	outline: none;
	border: 1px solid #ccc;
	border-radius: 10px;
	&:focus {
		border-color: #7d7c7c;
	}
	background-color: transparent;
`;

const TimeInput = styled.input`
	min-width: 40px;
	min-height: 42px;
	text-align: center;
	font-size: 16px;
	outline: none;
	border: 1px solid #ccc;
	border-radius: 50%;
	&:focus {
		border-color: #7d7c7c;
	}
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	@media (max-width: 1000px) {
		font-size: 13px;
		padding: 0;
		height: 10px;
	}
`;

// task 순서 표기 text
const OrderText = styled.span`
	color: white;
	font-weight: bold;
`;

// 분:초 단위로 표시하기 위한 colon
const Colon = styled.span`
	margin: 0 10px 0 10px;
	@media (max-width: 1000px) {
		padding-top: 10px;
		margin: 0 7px;
	}
`;

// color 선택
const PickColor = styled.div<{ pickColor: string }>`
	position: relative;
	width: 30px;
	height: 45px;
	background-color: transparent;
	margin-left: 30px;
	cursor: pointer;

	&::before,
	&::after {
		content: "";
		position: absolute;
		top: 0;
		width: 17px;
		height: 28px;
		background-color: ${(props) => props.pickColor};
	}

	&::before {
		top: 7px;
		left: 0px;
		border-radius: 50px 40px 0px 0px;
		transform: rotate(-45deg);
	}

	&::after {
		top: 7px;
		left: 8px;
		border-radius: 40px 50px 0px 0px;
		transform: rotate(45deg);
	}

	@media (max-width: 1000px) {
		margin-left: 25px;
	}
`;

// task 추가 버튼
const Button = styled.button`
	padding: 4px 6px;
	background-color: transparent;
	color: black;
	border: none;
	border-radius: 50%;
	cursor: pointer;
	font-size: 17px;
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 40px;
	height: 40px;
	margin-left: 15px;
	&:hover {
		background-color: #f0f0f0;
		animation: rotate 0.2s linear;
		@keyframes rotate {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(90deg);
			}
		}
	}

	@media (max-width: 1000px) {
		margin-left: 7px;
	}
`;

const TaskList = styled.div`
	margin-top: 40px;
`;

const TaskTime = styled.span`
	color: white;
	font-weight: bold;
	min-width: 90px;
	margin-left: 10px;

	@media (max-width: 1000px) {
		display: none;
	}
`;

const TaskName = styled.div`
	color: white;
	font-weight: bold;
	width: 350px;
	display: flex;
	justify-content: flex-start;
	margin-left: 20px;
`;

// 하나의 task 담고있는 영역
const TaskRow = styled.div`
	background-color: ${(props) => props.color};
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 10px;
	padding: 8px 20px;
	margin: 10px 10px;
	min-height: 35px;
`;

// task 삭제 버튼
const DeleteButton = styled.button`
	padding: 4px 6px;
	background-color: transparent;
	color: white;
	border: none;
	font-weight: bolder;
	cursor: pointer;
	font-size: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 40px;
	height: 40px;
	margin-left: 25px;
	&:hover {
		background-color: ${(props) => props.color};
		color: black;
	}

	@media (max-width: 1000px) {
		display: none;
	}
`;

// 루틴 완성 후 Done 버튼
const DoneButton = styled.button`
	padding: 4px 6px;
	background-color: transparent;
	color: Black;
	display: block;
	font-weight: bolder;
	cursor: pointer;
	font-size: 15px;
	align-self: flex-end;
	border: none;
`;

/* type 정의 */
interface Routine {
	id: number;
	name: string;
	color: string;
	time: string;
	totalSeconds: number;
}

interface AddRoutineProps {
	onClick: () => void;
}

const AddRoutine = (props: AddRoutineProps) => {
	const [taskName, setTaskName] = useState("");
	const [minutes, setMinutes] = useState("");
	const [seconds, setSeconds] = useState("");
	const [color, setColor] = useState("#FF595E");
	const [routine, setRoutine] = useState<Routine[]>([]);

	const orderList = ["1st", "2️nd", "3️rd", "4️th", "5️th"];

	// 랜더링 시 tasks 재조회
	useEffect(() => {
		const storedRoutine = JSON.parse(
			window.localStorage.getItem("routines") || "[]"
		) as Routine[];
		setRoutine(storedRoutine);
	}, []);

	// toast 호출 함수
	const notify = (msg: string) => toast(`${msg}`);

	// + 버튼 클릭 시 실행 함수
	const onClickAddBtn = () => {
		const totalMinutes = parseInt(minutes, 10) || 0;
		const totalSeconds = parseInt(seconds, 10) || 0;
		const secondsTotal = totalMinutes * 60 + totalSeconds;

		const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`;

		/* 사용자 입력 유효성 검사 */
		// 내용 미 입력 시 toast 알림
		if (taskName.length === 0) {
			notify(message.ERROR_EMPTY_TASK_NAME);
			return;

			// 30분 이상일 경우 30분으로 설정 및 toast 알림
		} else if (secondsTotal > 1800) {
			notify(message.ERROR_VALIDATION_TASK_TIME);
			setMinutes("30");
			setSeconds("00");
			return;

			// 시간 미 설정 시 toast 알림
		} else if (secondsTotal === 0) {
			notify(message.ERROR_EMPTY_TASK_TIME);
			return;

			// 유효성검사 통과 시 add 로직 실행
		} else {
			const newRoutine: Routine = {
				id: routine.length + 1,
				name: taskName,
				color: color,
				time: formattedTime,
				totalSeconds: secondsTotal,
			};

			const updatedRoutine = [...routine, newRoutine];
			reindexRoutine(updatedRoutine);
		}
	};

	const reindexRoutine = (updatedRoutine: Routine[]) => {
		const reindexedRoutine = updatedRoutine.map((routine, index) => ({
			...routine,
			id: index + 1,
		}));
		setRoutine(reindexedRoutine);
		window.localStorage.setItem("routines", JSON.stringify(reindexedRoutine));
	};

	const onClickColor = () => {
		setColor(getRandomColor());
	};

	// Delete 버튼 클릭 시 실행 함수
	const onClickDeleteBtn = (id: number) => {
		const updatedRoutine = routine.filter((routine) => routine.id !== id);
		reindexRoutine(updatedRoutine);
	};

	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={2000}
				closeButton={false}
				closeOnClick
				theme="light"
				limit={1}
			/>
			<Wrapper>
				<MainContent>
					<InputContainer>
						<Input
							type="text"
							placeholder={message.ASK_TASK_NAME}
							maxLength={30}
							value={taskName}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setTaskName(e.target.value)
							}
						/>
						<FlexContainer>
							<TimeInput
								type="number"
								placeholder="mm"
								value={minutes}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setMinutes(e.target.value)
								}
								maxLength={2}
								onWheel={(e) => e.preventDefault()}
								min={0}
								max={30}
							/>
							<Colon>:</Colon>
							<TimeInput
								type="number"
								placeholder="ss"
								value={seconds}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setSeconds(e.target.value)
								}
								maxLength={2}
								min={0}
								max={59}
							/>
							<PickColor pickColor={color} onClick={onClickColor}></PickColor>
							{routine.length < 5 && (
								<Button onClick={onClickAddBtn}>➕</Button>
							)}
						</FlexContainer>
					</InputContainer>
					<TaskList>
						{routine.map((routine, index) => (
							<TaskRow key={routine.id} color={routine.color}>
								<OrderText>{orderList[index]}</OrderText>
								<TaskName>{routine.name}</TaskName>
								<TaskTime>for &nbsp;&nbsp; {routine.time}</TaskTime>
								<DeleteButton onClick={() => onClickDeleteBtn(routine.id)}>
									Delete
								</DeleteButton>
							</TaskRow>
						))}
					</TaskList>
				</MainContent>
				{routine.length > 2 && (
					<DoneButton onClick={props.onClick}>Done!</DoneButton>
				)}
			</Wrapper>
		</>
	);
};

export default AddRoutine;
