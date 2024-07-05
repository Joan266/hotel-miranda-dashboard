import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styled from "styled-components";

const options = {
    on: "Green",
    off: "Red",
};

export const Button = styled.button`
    background-color: ${(props) => props.$status};
`;

describe('Button component', () => {
    let button;
  
    beforeEach(() => {
        render(<Button $status={options.on}>tosubmit</Button>);
        button = screen.getByRole("button", { name: /tosubmit/i });
    });

    test('should have the correct background color', () => {
        expect(button).toHaveStyle({
            backgroundColor: "Green"
        });
    });

    test('should have the correct text content', () => {
        expect(button).toHaveTextContent("tosubmit");
    });
});
