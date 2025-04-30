import styled from "styled-components";
import BannerHamburger from "../../assets/banner-hamburger.svg"
import Background from "../../assets/background.svg"


import { Link } from "react-router-dom";

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background: ${(props) => props.theme.secondWhite};

    background:
            linear-gradient(
            rgba(255,255,255,0.5),
            rgba(255,255,255,0.5)
            ),
            url('${Background}');
`

export const Banner = styled.section`
    background: url('${BannerHamburger}') no-repeat;
    background-position: center;
    background-color: ${(props) => props.theme.mainBlack};
    background-size: cover;

    display: flex;
    justify-content: center;
    align-items: center;
    height: 480px;
    width: 100%;
    position: relative;



    h1{
        color: ${(props) => props.theme.darkWhite};
        font-family: "Road Rage", serif;
        font-size: 80px;
        line-height: 65px;
        position: absolute;

        right: 20%;
        top: 30%;
    }

    span{
        display: block;
        color: ${(props) => props.theme.darkWhite};
        font-size: 20px;
        font-weight: 400;

    }

`

export const CategoryMenu = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    margin-top: 30px;
    position: relative;
`
export const CategoryButton = styled(Link)`
    text-decoration: none;
    background: none;
    cursor: pointer;
    color:${props => props.$isActiveCategory ? '#9758A6' : '#696969'}; //se a categoria for ativa, muda a cor
    font-size: 24px;
    font-weight: 500;
    padding-bottom: 5px;
    line-height: 20px;
    border: none;
    border-bottom: ${props => props.$isActiveCategory && '3px solid  #9758A6'}; //se a categoria for ativa, coloca a borda

`

export const ProductsContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 40px;
    gap: 60px;
    justify-content: center;
    max-width: 1280px;
    margin: 50px auto 0;
`

export const BackButton = styled(Link)`
    background: #9758A6;
    border: none;
    outline: none;
    color: ${(props) => props.theme.darkWhite};
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    position: absolute;
    left: 80px;
    text-decoration: none;

    img{
        width: 20px;
        margin-right: 10px;
        transform: rotate(-180deg);
    }

    &:hover{
        background: #7e4c8a;
    }
`