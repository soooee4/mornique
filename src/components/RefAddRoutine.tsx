import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { getRandomColor } from "../util";
import EmojiPicker from 'emoji-picker-react';

const Whole = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: pink;
  width: "80vw";
  border-radius: 20px;

`;

const EmojiAndTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
  padding: 10px;
  border-radius: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: "80%" */
`;

const Input = styled.input`
  font-size: 16px;
  min-width: 350px;
  padding: 13px;
  outline: none;
  border: none;
  border-radius: 10px;
  &:focus {
    border-color: #aaa;
  }
  background-color: transparent;
`;

const TimeInput = styled.input`
  width: 100px;
  margin-top: 10px;
  padding: 8px;
  outline: none;
  border: none;
  background-color: transparent;
  text-align: center;
  font-size: 16px;
`;

const PickColor = styled.div<{ pickColor: string }>`
  min-width: 30px;
  height: 20px;
  background-color: ${(props) => props.pickColor};
  cursor: pointer;
  border-radius: 3px;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #45a049;
  }
`;

const EmojiDisplay = styled.span`
  font-size: 48px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

interface Routine {
  id: number;
  name: string;
  color: string;
  time: string;
  totalSeconds: number;
}

interface EmojiObject {
  emoji: string;
}

const AddRoutine = () => {
  const [routineName, setRoutineName] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [color, setColor] = useState("#FF595E");
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [chosenEmoji, setChosenEmoji] = useState<EmojiObject | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const onEmojiClick = (emojiObject: EmojiObject) => {
    setChosenEmoji(emojiObject);
    setShowPicker(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onClickColor = () => {
    setColor(getRandomColor());
  };

  const onClickAddBtn = () => {
    const totalMinutes = parseInt(minutes, 10) || 0;
    const totalSeconds = parseInt(seconds, 10) || 0;
    const secondsTotal = totalMinutes * 60 + totalSeconds;

    const formattedTime = `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    const newRoutine: Routine = {
      id: routines.length + 1,
      name: routineName,
      color: color,
      time: formattedTime,
      totalSeconds: secondsTotal
    };

    const updatedRoutines = [...routines, newRoutine];
    setRoutines(updatedRoutines);
    window.localStorage.setItem("routines", JSON.stringify(updatedRoutines));
  };

  return (
    <Whole>
      <Wrapper>
        <EmojiAndTimeContainer>
          {chosenEmoji ? (
            <EmojiDisplay onClick={() => setShowPicker(true)}>
              {chosenEmoji.emoji}
            </EmojiDisplay>
          ) : (
            <Button onClick={() => setShowPicker(true)}>Pick Emoji</Button>
          )}
         
          {/* <TimeInput
            type="text"
            placeholder="mm:ss"
            value={`${minutes}:${seconds}`}
            onChange={e => {
              const [min, sec] = e.target.value.split(':');
              setMinutes(min);
              setSeconds(sec);
            }}
          /> */}

          <PickColor pickColor={color} onClick={onClickColor} />
        </EmojiAndTimeContainer>
        <InputContainer>
          <Input
            type="text"
            placeholder="What's your plan for this morning?"
            maxLength={50}
            value={routineName}
            onChange={e => setRoutineName(e.target.value)}
          />
          <Button onClick={onClickAddBtn}>Add Routine</Button>
        </InputContainer>
      </Wrapper>
    </Whole>
    
  );
};

export default AddRoutine;
