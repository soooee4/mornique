import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getRandomColor } from "../util";
import message from "./message";

/* style 정의 */

const Wrapper = styled.div`
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const InputContainer = styled.div`
	display: flex;
	align-items: center;
	width: 80%;
`;

// 사용자 task 입력
const Input = styled.input`
	font-size: 17px;
	min-width: 350px;
	padding: 12px;
	margin-right: 30px;
	flex-grow: 1;
	outline: none;
	border: 1px solid #ccc;
	border-radius: 10px;
	&:focus {
		border-color: #7d7c7c;
	}
	background-color: transparent;
`;

const TimeInput = styled.input`
	width: 40px;
	height: 40px;
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
`;

// task 순서 표기 text
const OrderText = styled.span`
	color: white;
	font-weight: bold;
`;

// 분:초 단위로 표시하기 위한 colon
const Colon = styled.span`
	margin: 0 10px 0 10px;
`;

// color 선택
const PickColor = styled.div<{ pickColor: string }>`
	min-width: 30px;
	height: 20px;
	background-color: ${(props) => props.pickColor};
	cursor: pointer;
	border-radius: 3px;
	margin-left: 30px;
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
	margin-left: 25px;
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
`;

const TaskList = styled.div`
	margin-top: 20px;
	margin-left: 10px;
	width: 100%;
`;

const TaskTime = styled.span`
	color: white;
	font-weight: bold;
`;

const TaskName = styled.div`
	color: white;
	font-weight: bold;
	width: 350px;
	display: flex;
	justify-content: flex-start;
`;

// 하나의 task 담고있는 영역
const TaskRow = styled.div`
	background-color: ${(props) => props.color};
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 80%;
	padding: 10px;
	margin-bottom: 5px;
	border-radius: 5px;
`;

// task 삭제 버튼
const DeleteButton = styled.button`
	padding: 4px 6px;
	background-color: transparent;
	color: white;
	border: none;
	font-weight: bolder;
	border-radius: 50%;
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
			window.localStorage.getItem("routine") || "[]"
		) as Routine[];
		setRoutine(storedRoutine);
	}, []);

	// + 버튼 클릭 시 실행 함수
	const onClickAddBtn = () => {
		// 입력받은 분, 초를 초로 변환
		const totalMinutes = parseInt(minutes, 10) || 0;
		const totalSeconds = parseInt(seconds, 10) || 0;
		const secondsTotal = totalMinutes * 60 + totalSeconds;

		const formattedTime = `${minutes.padStart(2, "0")}:${seconds.padStart(
			2,
			"0"
		)}`;
		const newRoutine: Routine = {
			id: routine.length + 1,
			name: taskName,
			color: color,
			time: formattedTime,
			totalSeconds: secondsTotal,
		};

		const updatedRoutine = [...routine, newRoutine];
		reindexRoutine(updatedRoutine);
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
			<Wrapper>
				<InputContainer>
					<Input
						type="text"
						placeholder={message.AskTaskName}
						maxLength={50}
						value={taskName}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setTaskName(e.target.value)
						}
					/>
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
					<Button onClick={onClickAddBtn}>➕</Button>
				</InputContainer>
			</Wrapper>
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
			{/* <button onClick={props.onClick}>Done</button> */}
		</>
	);
};

export default AddRoutine;
