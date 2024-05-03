import React, { useState, useEffect } from "react";
import "./App.css";
import {
	InitialRainbow,
	CustomRainbow,
	AddRoutine,
	ModalOverlay,
  CustomFirstRainbow
} from "./components";

function App() {
	const [state, setState] = useState("initial");
	const [modal, setModal] = useState(false);
  const [logoText, setLogoText] = useState('start');

  // 모든 동작 완료 후 컴포넌트 및 로컬 스토리지 초기화
	const onClear = () => {
		setState("initial");
		setLogoText("start");
		setTimeout(() => {
			window.localStorage.removeItem("routines");
		}, 1000);
	};

  return (
		<>
			{/* state 값이 initial이고 모달이 열려있지 않은 경우 초기값 rainbow 컴포넌트 노출 */}
			{state === "initial" && !modal && (
				<InitialRainbow onClick={() => setModal(true)} />
			)}

			{/* state 값이 custom일 경우 사용자가 입력한 정보 기반의 rainbow 컴포넌트 노출 */}
			{state === "custom" && logoText === "start" && (
				<CustomRainbow
					setState={() => setState("initial")}
					setLogoText={() => setLogoText("finish")}
				/>
			)}

			{/* state 값이 customFirst이고 logoText가 start인 경우 */}
			{state === "customFirst" && logoText === "start" && (
				<CustomFirstRainbow 
					onClick={() => setState("custom")} 
					logoText={logoText}
				/>
			)}

			{/* state 값이 custom이고 logoText가 finish인 경우 */}
			{state === "custom" && logoText === "finish" && (
				<CustomFirstRainbow
					onClick={onClear}
					logoText={logoText}
				/>
			)}

			{modal && (
				<ModalOverlay onClick={() => setModal(false)}>
					<AddRoutine
						onClick={() => {
							setState("customFirst");
							setModal(false);
						}}
					/>
				</ModalOverlay>
			)}
		</>
	);
}

export default App; 