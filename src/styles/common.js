import styled from 'styled-components';

const Container = styled.div`
  padding: 1em;
  overflow-y:auto;
  max-height:70%
`;

const Title = styled.h1`
  font-weight:600;
  font-size: 1.15rem;
  margin-left:1.5em;
`;

const Text = styled.h1`
  font-size: 0.75rem;
  font-weight:500;
  color: ${props => props.theme.colors.mediumBlack};
`;

export { Container, Title, Text }