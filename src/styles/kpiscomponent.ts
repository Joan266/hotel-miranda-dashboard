import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const ButtonsContainer = styled.div`
    display: flex;
    width: 100%;
    gap: 1.5rem;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1.5rem;
`

export const ButtonContent = styled(NavLink)`
    all: unset;
    cursor: pointer;
    width: 25%;
    display: flex;
    padding: 1rem;
    border-radius: 1rem;
    gap: 1.5rem;
    background-color: white;
    transition: scale 0.3s ease, box-shadow 0.2s ease;
    box-shadow: 4px 4px 5px -4px rgba(0, 0, 0, 0.1);

    & > div:first-child {
            background-color: #ffedec;
        }

    div svg {
        color: #e23428;
        font-size: 22px;
    }

    &:hover {
        scale: 1.08;
        box-shadow: rgba(0, 0, 0, 0.15) 6px 6px 12px;

        & > div:first-child {
            background-color: #e23428;
        }

        div svg {
            color: white;
        }
    }
`

export const ButtonImage = styled.div`
    display: flex;
    flex:1;
    align-items: center;
    background-color: #ffedec;
    padding: 1rem;
    border-radius: 0.5rem;
    height: 100%;
    width: auto;
    aspect-ratio: 1/1;
    justify-content: center;

    svg {
        transition: color 0.3s ease;
    }
`

export const ButtonTextContainer = styled.div`
    width: 100%;

    h3 {
        font-size: 30px;

   
    }

    p {
        color: #787878;
        font-weight: 300;
        font-size: 14px;


    }
`