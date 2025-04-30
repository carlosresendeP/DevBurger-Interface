import PropTypes from "prop-types";
import { ContainerButton } from "./styles";


export function Button({children, ...props}){
    //proucurar o children desmenbrando o objeto
    //children é o texto que está dentro do botão vindo do componente
    //props é o restante das propriedades do botão (type, onClick, etc)
    
    return(
        <ContainerButton {...props}>{children}</ContainerButton>
    )
}

Button.propTypes = {
    children: PropTypes.string
}