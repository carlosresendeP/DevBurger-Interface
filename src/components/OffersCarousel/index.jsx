import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';

import { api } from "../../services/api";
import { Container, Title } from "./styles.js";
import { CardProduct } from "../CardProduct";
import { formatPrice } from "../../utils/formatPrice.js";

export function OffersCarousel() {

    //vai armazenar as categorias
    //useState é um hook que armazena o estado de uma variável
    const [offers, setOffers] = useState([]);

    //useEffect é chamado assim que o componente é montado na tela
    useEffect(() => {

        async function loadProducts() {
            const { data } = await api.get('/products');

            //filtrando os produtos que tem oferta
            const onlyOffers = data
            .filter((product) => product.offer) //vai retornar apenas os produtos que tem a propriedade offer como true
            .map((product) => ({
                currencyValue: formatPrice(product.price),...product //vai retornar um objeto com a propriedade currencyValue e todas as outras propriedades do produto
            }));



            setOffers(onlyOffers); 
        }

        loadProducts();
    }, [])


    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 4,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1280 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1280, min: 690 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 690, min: 0 },
            items: 2
        }
    };


    return (
        <Container>
            <Title>Ofertas do Dia</Title>

            <Carousel
                responsive={responsive} //responsividade do carrossel
                infinite={true} //se o carrossel vai ser infinito
                partialVisbile={false} //se o item for parcialmente visível, ele não será clicável
                itemClass="carousel-item"
            >
                {/* mapeando as categorias */}
                {offers.map((product) => (
                    <CardProduct key={product.id} product={product} />
                    
                ))}
                
            </Carousel>
        </Container>
    );
}

