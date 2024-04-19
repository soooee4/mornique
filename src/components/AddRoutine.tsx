import React, { useState } from "react";
import styled from "styled-components";
import { getRandomColor } from "../util";

// 전체 영역
const Wrapper = styled.div`
	width: 100%;
	padding: 20px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid blue;
`;

const InputContainer = styled.div`
	display: flex;
	align-items: center;
	width: 80%;
`;

// task 입력 input
const Input = styled.input`
	font-size: 16px;
	min-width: 350px;
	padding: 13px;
	margin-right: 30px;
	flex-grow: 1;
	outline: none;
	border: 1px solid #ccc;
	border-radius: 10px;
	&:focus {
		border-color: #aaa;
	}
`;

// 소요 시간 입력 input
const TimeInput = styled.input`
	width: 22px;
	height: 22px;
	padding: 8px;
	text-align: center;
	outline: none;
	border: 1px solid #ccc;
	border-radius: 50%;
	&:focus {
		border-color: #aaa;
	}
`;

// 소요시간 분, 초 구분 위한 colon
const Colon = styled.span`
	margin: 0 10px 0 10px;
`;

// 색상 선택 영역
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
	font-size: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 40px;
	height: 40px;
	margin-left: 25px;
	&:hover {
		background-color: #f0f0f0;
	}
`;

const AddRoutine = () => {
	const [routineName, setRoutineName] = useState("");
	const [minutes, setMinutes] = useState("");
	const [seconds, setSeconds] = useState("");
	const [color, setColor] = useState("#c17bed");

	const onClickAddBtn = () => {
		// task 추가 시 로직
	};

	const onClickColor = () => {
		setColor(getRandomColor());
	};

	return (
		<Wrapper>
			<InputContainer>
				<Input
					type="text"
					placeholder="What's your plan for this morning?"
					maxLength={50}
					value={routineName}
					onChange={(e) => setRoutineName(e.target.value)}
				/>
				<TimeInput
					type="text"
					placeholder="mm"
					value={minutes}
					onChange={(e) => setMinutes(e.target.value)}
					maxLength={2}
				/>
				<Colon>:</Colon>
				<TimeInput
					type="text"
					placeholder="ss"
					value={seconds}
					onChange={(e) => setSeconds(e.target.value)}
					maxLength={2}
				/>
				<PickColor pickColor={color} onClick={onClickColor}></PickColor>
				<Button onClick={onClickAddBtn}>+</Button>
			</InputContainer>
		</Wrapper>
	);
};

export default AddRoutine;
