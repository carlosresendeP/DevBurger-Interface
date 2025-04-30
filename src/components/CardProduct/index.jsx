import PropTypes from "prop-types"; 
import {useCart} from "../../hooks/CartContext.jsx"

import { CardImage, Container } from "./styles";
import { CartButton } from "../CartButton";

export function CardProduct({ product }) {
    const {putProductCart} = useCart(); //importando a função putProductCart do CartContext
    

    return (
        <Container>
            <CardImage src={product.url} alt={product.name} />
            <div>
                <p>{product.name}</p>
                <strong>{product.currencyValue}</strong>
                {/*<strong>{formatPrice(product.price)}</strong>*/}
            </div>
            
            <CartButton onClick={()=> putProductCart(product)}></CartButton>
        </Container>
    );
}

CardProduct.propTypes = {
    product: PropTypes.object,
};