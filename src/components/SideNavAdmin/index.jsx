import { Container, NavLinkContainer, NavLink, Footer  } from "./styles";

import { navLinks } from "./NavLinks.jsx";
import Logo from "../../assets/Logo.svg";
import {useUser} from "../../hooks/UserContext.jsx";
import { SignOut } from "@phosphor-icons/react";
import { useResolvedPath } from "react-router-dom";

export function SideNavAdmin() {

    const {logout} = useUser();

    const {pathname} = useResolvedPath(); // Hook para obter o caminho atual

    return (
        <Container>
            <img src={Logo} alt="DevBurger-Logo" />

            <NavLinkContainer>

                {navLinks.map((link) => (
                    <NavLink 
                    key={link.path}
                    to={link.path}
                    $isActive={pathname === link.path} // Verifica se o caminho atual é igual ao do link
                    >
                        {link.icon}
                        <p>{link.label}</p>
                    </NavLink>
                ))} 

            </NavLinkContainer>    
            <Footer>
                <NavLink to="/login" onClick={logout}>

                    <SignOut/> {/* Icone de Sair */}
                    <p>Sair</p>

                </NavLink>
            </Footer>
        </Container>
    )
}