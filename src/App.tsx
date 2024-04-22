import React, { useState } from "react";
import "./App.css";
import {
	InitialRainbow,
	CustomRainbow,
	AddRoutine,
	RoutineModal,
} from "./components";

function App() {

  const [state, setState] = useState('initial');
  const [modal, setModal] = useState(false);

	return (
		<div className="App">
			{state === "initial" && <InitialRainbow onClick={() => setModal(true)} />}
			{state === "custom" && <CustomRainbow />}

			{modal && (
				<AddRoutine
					onClick={() => {
						setState("custom");
						setModal(false);
					}}
				/>
			)}
		</div>
	);
}

export default App;
