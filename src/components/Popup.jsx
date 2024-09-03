import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';



const Popup = ({ message, onClose, onAccept }) => {
  return (
    <Overlay>
      <PopupContainer>
        <CloseButton onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
        <Message>{message}</Message>
        <Button onClick={onAccept}>Aceptar</Button>
      </PopupContainer>
    </Overlay>
  );
};

export default Popup;
