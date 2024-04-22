import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  width: 50vw;
  height: 60vh;
  background-color: white;
  border-radius: 30px;
  padding: 50px; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.8); 
  overflow: auto;
`;

interface ModalOverlayProps {
  children: React.ReactNode;
  onClick: () => void;
}

const ModalOverlay= (props: ModalOverlayProps) => {

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  }

  return (
    <Overlay onClick={props.onClick}>
      <ModalContent onClick={stopPropagation}> 
        {props.children}
      </ModalContent>
    </Overlay>
  );
};

export default ModalOverlay;
