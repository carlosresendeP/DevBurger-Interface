import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import {useCart} from '../../hooks/CartContext.jsx'
import {api} from '../../services/api.js'
import {formatPrice} from '../../utils/formatPrice'

import {Button} from '../../components'
import { Container } from './styles'

export function CartResume(){
    const [finalPrice, setFinalPrice] = useState(0);
    const [delivetyTax] = useState(500); // R$5,00 taxa de entrega fixa

    const navigate = useNavigate();

    const {cartProducts, clearCart} = useCart();

    /*const list = [1,2, 3, 4,5,10]
    list.reduce((acc, valor)=>{
        return acc + valor
    }, 0)
    console.log(list);*/
    

    //atualiza o valor final do carrinho 
    useEffect(() => {

        //soma o valor de todos os produtos no carrinho (acc é o acumulador, currency é o valor atual, 0 é o valor inicial do acumulador)
        const sumAllItemns = cartProducts.reduce((acc, currency) => {
            return currency.price * currency.quantity + acc;
        }, 0);

        setFinalPrice(sumAllItemns)
    
    }, [cartProducts])

    
    //funcão para enviar o pedido para a api e verificar se o pedido foi realizado com sucesso
    const submitOrder = async () => {
        const products = cartProducts.map((product) => {
            return{
                id: product.id, 
                quantity: product.quantity,
                price: product.price
            };

        });

        //Entrar em conato com o stripe no banco de dados
        try{
            const {data} = await api.post('/create-payment-intent', {products});

            //vai para a pagina de checkout e envia o {data} para ela
            navigate('/checkout', {
                state:data,
            });
            
        }catch(err){
            toast.error('ERRO! Tente Novamente', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }




    };
    

    return(
        <div>
            <Container>
                <div className="container-top">
                    <h2 className='title'>Resumo do Pedido</h2>
                    <p  className='items'>
                        Itens
                    </p>
                    <p  className='items-price'>{formatPrice(finalPrice)}</p> {/*valorfinal*/}
                    <p  className='delivery-tax'>
                        Taxa de Entrega
                    </p>
                    <p  className='delivery-tax-price'>{formatPrice(delivetyTax)}</p>
                </div>

                <div className="container-bottom">
                    <p>
                        Total
                    </p>
                    <p>{formatPrice(finalPrice + delivetyTax)}</p>

                </div>
            </Container>

            <Button onClick={submitOrder}>Finalizar Pedido</Button>
        </div>
    )
}