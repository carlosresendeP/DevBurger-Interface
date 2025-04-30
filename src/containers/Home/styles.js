import styled from "styled-components";
import BannerHome from "../../assets/banner-home.svg"
import BackgroundHome from "../../assets/background.svg"

export const Banner = styled.div`
    background: url('${BannerHome}');
    background-size: cover;
    background-position: center;

    height: 450px;

    h1{
        color: ${(props) => props.theme.darkWhite};
        font-family: "Road Rage", serif;
        font-size: 80px;
        position: absolute;
        right: 20%;
        top: 10%;
    }
`
export const Container = styled.section`
    background:
        linear-gradient(
        rgba(255,255,255,0.5),
        rgba(255,255,255,0.5)
        ),
        url('${BackgroundHome}');
        
    background-position: center;
    background-repeat: repeat;
    background-size: contain;
    height: 100%;
`
