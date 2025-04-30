import styled from "styled-components";

export const ProductImage = styled.img`
    width: 80%;
    height: 80%;
    border-radius: 16px;
`;

export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        width: 30px;
        color: ${(props) => props.theme.white};
        border-radius: 4px;
        background-color:${(props) => props.theme.purple};
        transition: background-color 0.3s;
        border: none;

        &:hover {
            background-color: ${(props) => props.theme.secondDarkPurple};
        }
    }
`;

export const EmptyCart = styled.p`
    font-size: 20px;
    font-weight: bold;
    text-align: center;

`;

export const TotalPrice = styled.p`
    font-weight: bold;

`

export const TrashImage = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: filter 0.3s;

`;