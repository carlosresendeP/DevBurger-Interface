import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from "react-router-dom";

import { api } from "../../services/api";
import { CategoryButton, Container, ContainerItems, Title } from "./styles.js";


export function CategoriesCarousel() {

    //vai armazenar as categorias
    //useState é um hook que armazena o estado de uma variável
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate()

    //useEffect é chamado assim que o componente é montado na tela
    useEffect(() => {

        async function loadCategories() {
            const { data } = await api.get("/categories");

            setCategories(data);
            
        }

        loadCategories();
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
            <Title>Categorias</Title>

            <Carousel
                responsive={responsive} //responsividade do carrossel
                infinite={true} //se o carrossel vai ser infinito
                partialVisbile={false} //se o item for parcialmente visível, ele não será clicável
                itemClass="carousel-item"
            >
                {/* mapeando as categorias */}
                {categories.map((category) => (
                    <ContainerItems key={category.id} imageUrl={category.url}>
                        <CategoryButton 
                        onClick={()=>{
                            navigate(
                                {
                                    pathname:"/cardapio",
                                    search: `?categoria=${category.id}` 
                                }
                            )
                        }}
                        
                        
                        >{category.name}</CategoryButton>
                    </ContainerItems>
                    
                ))}
                
            </Carousel>
        </Container>
    );
}

