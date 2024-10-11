import styled from 'styled-components';

interface TextProps {
  $maxwidth?: string;
}

const Container = styled.div`
  padding: 1em;
  overflow-y: auto;
  max-height: calc(100vh - 5em);
  max-width: calc(100vw - 250px);
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 1.15rem;
  margin-left: 1.5em;
`;

const Text = styled.div<TextProps>`
  font-size: 0.7rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.mediumBlack};
  max-width: ${(props) => props.$maxwidth ? props.$maxwidth : "none"};
`;

const SmallText = styled.div`
  font-size: 0.65rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.gray};
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.darkGreen}; 
  color: white; 
  padding: 10px 20px; 
  border-radius: 5px; 
  font-weight:bold;
  cursor: pointer;
  font-size: 16px; 
`;
const IsTextActive = styled.div<{ $status: string }>`
  color: ${props => props.$status === "true" ? "#5AD07A" : "#E23428"};
`;
const StatusColor = styled.div<{ $status: string }>`
  color: ${(props) => {
    switch (props.$status) {
      case "available":
        return "#5AD07A";   // Green
      case "booked":
        return "#F0A500";   // Yellow 
      case "maintenance":
        return "#1E90FF";   // Blue 
      case "unavailable":
        return "#E23428";   // Red 
      case "cancelled":
        return "#FF6347";   // Tomato 
      case "refund":
        return "#FF4500";   // OrangeRed 
      case "pending":
        return "#FFB347";   // Light Orange 
      default:
        return "#000";      // Default black
    }
  }};
`;

const LabelContainer = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  width:100%;
`;
const ArrowContainer = styled.span`
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
`;

const Triangle = styled.div<{ $isActive: boolean; $isDirection: boolean }>`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  cursor: pointer;
  margin: 1px 0; 
  border-bottom: ${(props) =>
    props.$isActive ? '8px solid darkgreen' : '8px solid gray'};
  transform: ${(props) => (props.$isDirection ? 'rotate(0deg)' : 'rotate(180deg)')}; 
`;
export { Container, Title, Text, SmallText, Button, IsTextActive, LabelContainer, ArrowContainer, Triangle, StatusColor };
