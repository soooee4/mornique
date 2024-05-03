import React, { useState } from "react";
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

  // 모든 동작 완료 후 컴포넌트 및 로컬 스토리지 초기화 함수
  const onClear = () => {
    setState("initial");
    setLogoText("start");
    setTimeout(() => {
      window.localStorage.removeItem("routines");
    }, 1000);
  };

  // 조건부 렌더링을 위한 변수
  let content;

  if (state === "initial" && !modal) {
    content = <InitialRainbow onClick={() => setModal(true)} />;

  } else if (state === "custom" && logoText === "start") {
    content = (
      <CustomRainbow
        setState={() => setState("initial")}
        setLogoText={() => setLogoText("finish")}
      />
    );

  } else if (state === "customFirst" && logoText === "start") {
    content = (
      <CustomFirstRainbow
        onClick={() => setState("custom")}
        logoText={logoText}
      />
    );

  } else if (state === "custom" && logoText === "finish") {
    content = (
      <CustomFirstRainbow
        onClick={onClear}
        logoText={logoText}
      />
    );
  }


  return (
    <>
      {content}

      {modal && (
        <ModalOverlay onClick={() => setModal(false)}>
          <AddRoutine
            onClick={() => {
              setState("customFirst");
              setModal(false);
            }}
            state={state}
          />
        </ModalOverlay>
      )}
    </>
  );
}

export default App;