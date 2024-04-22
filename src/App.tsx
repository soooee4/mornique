import React, { useState } from "react";
import "./App.css";
import {
	InitialRainbow,
	CustomRainbow,
	AddRoutine,
} from "./components";

function App() {
	const [state, setState] = useState("initial");
	const [modal, setModal] = useState(false);

	return (
		<>
    {/* state 값이 initial이고 모달이 열려있지 않은 경우 초기값 rainbow 컴포넌트 노출 */}
			{state === "initial" && !modal && (
				<>
					<InitialRainbow onClick={() => setModal(true)} />
				</>
			)}
      {/* state 값이 custom일 경우 사용자가 입력한 정보 기반의 rainbow 컴포넌트 노출 */}
			{state === "custom" && <CustomRainbow />}

			{modal && (
				<AddRoutine
					onClick={() => {
						setState("custom");
						setModal(false);
					}}
				/>
			)}
		</>
	);
}

export default App;
