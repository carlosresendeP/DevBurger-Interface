import {useContext, createContext, useEffect, useState} from 'react';

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartProducts, setCartProducts] = useState([]);

    //adiciona um produto ao carrinho
    const putProductCart = (product) => { 
        const cardIndex = cartProducts.findIndex((item) => item.id === product.id);
        //verifica se o produto já está no carrinho, findIndex retorna o index do produto no array, se não encontrar, retorna -1
        //se o produto já estiver no carrinho, aumenta a quantidade
        //se encontrar o produto no carrinho, retorna o index do produto, se não encontrar, retorna -1

        //cria um novo array para adicionar o produto
        let newProductsInCart = []; 

        if(cardIndex >= 0){ //se o produto já estiver no carrinho

            newProductsInCart = cartProducts; //copia o array de produtos do carrinho
            newProductsInCart[cardIndex].quantity = newProductsInCart[cardIndex].quantity + 1; //aumenta a quantidade do produto no carrinho, o newProductsInCart[cardIndex] é o produto que está no carrinho, o .quantity é a quantidade do produto
            setCartProducts(newProductsInCart); //atualiza o array de produtos do carrinho

        }else{ //se o produto não estiver no carrinho

            product.quantity = 1;  //adiciona a quantidade do produto
            newProductsInCart = [...cartProducts, product]; //adiciona o produto ao array de produtos do carrinho
            setCartProducts(newProductsInCart);

        }

        updateLocalStorage(newProductsInCart)

    }

    //limpa o carrinho
    const clearCart = () => { 
        setCartProducts([]);
        updateLocalStorage([]);


    }

    //deleta um produto do carrinho
    const deleteProduct = (productId) => { 
        const newCart = cartProducts.filter((product)=> product.id !== productId); //cria um novo array de produtos do carrinho, excluindo o produto que foi deletado

        setCartProducts(newCart);
        updateLocalStorage(newCart);

    }

    //aumenta a quantidade de um produto no carrinho
    const increaseProduct = (productId) => { 

        const newCart = cartProducts.map((product) => {
            return product.id === productId 
            ? {...product, quantity: product.quantity + 1} 
            : product;
        });

        setCartProducts(newCart);
        updateLocalStorage(newCart);

    }

    //diminui a quantidade de um produto no carrinho
    const decreaseProduct = (productId) => { 
        const cardIndex = cartProducts.findIndex((product) => product.id === productId); 

        if(cartProducts[cardIndex].quantity >1){
            const newCart = cartProducts.map((product) => {
                return product.id === productId 
                ? {...product, quantity: product.quantity - 1} 
                : product;
            });
            setCartProducts(newCart);
            updateLocalStorage(newCart);
        }else{
            deleteProduct(productId);
        }

    };

    //atualiza o localStorage
    const updateLocalStorage = (products) => {
        localStorage.setItem('devburger:cartInfo', JSON.stringify(products));
    }
    
    //carrega os produtos do carrinho do localStorage ao carregar a página
    useEffect(() => {
        const clientCartData = localStorage.getItem('devburger:cartInfo');

        if(clientCartData){
            setCartProducts(JSON.parse(clientCartData));
        }
        
    }, [])
    
    
    

    return(
        <CartContext.Provider value={{cartProducts, putProductCart, clearCart, deleteProduct, increaseProduct, decreaseProduct}}> {children}</CartContext.Provider>
    )
};

export const useCart = () => {
    const context = useContext(CartContext);
    if(!context){
        throw new Error('useCart must be used with a context');
    }
    return context;
}