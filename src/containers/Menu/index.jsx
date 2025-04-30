import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Container, Banner, CategoryMenu, ProductsContainer, CategoryButton, BackButton } from "./styles";
import { api } from "../../services/api";
import { formatPrice } from "../../utils/formatPrice";
import { CardProduct } from "../../components/CardProduct";
import iconBack from "../../assets/icon-back.svg"


export function Menu() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [filteredProducts, setFilteredProducts] = useState([]);

    const navigate = useNavigate();

    const {search} = useLocation(); //categoria=1

    const queryParams = new URLSearchParams(search); //ulrSearchParams é uma classe que permite manipular os parametros da URL



    const [activeCategory, setActiveCategory] = useState(()=>{
        const categoryId = +queryParams.get("categoria") //retorna o valor do parametro categoria

        if (categoryId){
            return categoryId;
        }
        return 0;            
    });


    //useEffect é chamado assim que o componente é montado na tela
    useEffect(() => {

        async function loadCategories() {
            const { data } = await api.get("/categories");

            /*
                Spread Operator (...):
                    O operador spread (...) é usado para espalhar as propriedades de um objeto em outro objeto.
                    ...data significa que todas as propriedades do objeto data serão copiadas para o novo objeto.
            */

            const newCategories = [{ id: 0, name: "Todas"}, ...data ];


            setCategories(newCategories);

        }

        async function loadProducts() {
            const { data } = await api.get('/products');

            const NewProducts = data
                .map((product) => ({
                    currencyValue: formatPrice(product.price), ...product //vai retornar um objeto com a propriedade currencyValue e todas as outras propriedades do produto
                }));


            setProducts(NewProducts);
        }

        loadCategories()
        loadProducts();

    }, []);

    //esse useEffect é chamado toda vez que a variável activeCategory ou os produtos mudarem
    //ele filtra os produtos de acordo com a categoria ativa
    useEffect(() => {
        if (activeCategory === 0){
            setFilteredProducts(products);
        }else{
            const newFilteredProducts = products.filter(
                (product)=> product.category_id === activeCategory);

            setFilteredProducts(newFilteredProducts);
        }
    },[products, activeCategory]);

    return (
        <Container>
            <Banner>
                <h1>
                    O MELHOR <br />
                    HAMBÚRGUER <br />
                    ESTÁ AQUI!

                    <span>Esse cardápio está irresistível!</span>
                </h1>


            </Banner>
        
            <CategoryMenu>
                <BackButton 
                onClick={()=>navigate('/')} //navega para a home
                > <img src={iconBack} alt="voltar" />
                Voltar</BackButton>
                {categories.map((category) => (
                    <CategoryButton
                    key={category.id}
                    //verifica se a categoria é a ativa
                    $isActiveCategory={category.id === activeCategory} //$ é uma convenção para dizer que é uma propriedade do styled component
                    onClick={()=>{
                        navigate({
                            pathname: '/cardapio',
                            search: `?categoria=${category.id}`   //query utilizada para passar parametros pela URL ?
                        },
                        {
                            replace: true, //substitui a URL atual pela nova
                        },

                        
                    )
                    setActiveCategory(category.id); //seta a categoria ativa
                    }}
                    
                    >{category.name}</CategoryButton>
                ))}
            </CategoryMenu>

            <ProductsContainer>
                {filteredProducts.map((product) => (
                    <CardProduct product={product} key={product.id}></CardProduct>
                ))}
            </ProductsContainer>

        </Container>

    )

}