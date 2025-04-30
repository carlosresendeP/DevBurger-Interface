import { UserCircle, ShoppingCart} from '@phosphor-icons/react';
import { useNavigate, useResolvedPath} from 'react-router-dom'

import { Container, Navigation, HeaderLink, Opition, Profile, Logout, LinkContainer, Content } from './styles';
import { useUser } from '../../hooks/UserContext';



export function Header(){
    const navigate = useNavigate();

    const {logout, infoUser} = useUser()  

    const {pathname} = useResolvedPath() //motra exatamente o caminho que está sendo acessado no momento "/", "/cardapio" etc..

    function LogoutUser(){
        logout();
        navigate('/login')
    }
    
    

    return(
        <Container>
            <Content>
                <Navigation>
                    <div>
                        <HeaderLink to='/' $isActive={pathname=== '/'} >Home</HeaderLink>
                        <hr />
                        <HeaderLink to='/cardapio' $isActive={pathname=== '/cardapio'}>Cardápio </HeaderLink>
                    </div>
                </Navigation>
                <Opition>
                    <Profile>
                        <UserCircle color='#fff' size={24}></UserCircle>
                        <div>
                            <p>
                                Olá, <span>{infoUser.name}</span>
                            </p>
                            <Logout onClick={LogoutUser}>Sair</Logout>
                        </div>
                    </Profile>

                    <LinkContainer>
                        <ShoppingCart color='#fff' size={24}></ShoppingCart>
                        <HeaderLink to='/carrinho' >Carrinho</HeaderLink>
                    </LinkContainer>

                </Opition>



            </Content>

        </Container>

    )
}