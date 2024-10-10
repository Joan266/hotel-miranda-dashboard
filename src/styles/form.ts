import styled from "styled-components";

const Form = styled.form`
  padding: 1.5em 4em;
  background-color: white;
  border-radius: 15px;
  box-shadow: 1px 1px 5px black;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3em 0;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1em 2em;
`;

const FormGroup = styled.div`
  margin-bottom: 0.5em;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none; 
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const SubmitButton = styled.button`
  padding: 0.7rem 1.5rem;
  background-color: #222;
  color: white;
  border: none;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
  font-weight:bold;
  justify-self: end;
  transition: 0.3s background-color ease;
  &:hover {
    background-color: ${(props) => props.theme.colors.darkGreen};
  }
`;
const ValidationError = styled.span`
  color:red;
  font-size:12px;
`
export { Form, FormGrid, FormGroup, SubmitButton, Checkbox, TextArea, Input, Label, Container, ValidationError };