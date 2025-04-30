import styled from "styled-components";

export const Container = styled.footer`
    height: 50px;
    width: 100%;
    background-color:${(props) => props.theme.darkPurple};
    display: flex;
    align-items: center;
    justify-content: center;

    p{
        font-weight: lighter;
        color: ${(props) => props.theme.white};
        font-size: 14px;
    }

`;