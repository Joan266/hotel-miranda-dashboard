import styled from 'styled-components';

interface TextProps {
  maxwidth?: string;
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
  max-width: ${(props) => props.maxwidth ? props.maxwidth : "none"};
`;

const SmallText = styled.div`
  font-size: 0.65rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.gray};
`;

export { Container, Title, Text, SmallText };
