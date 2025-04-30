import {Table} from '../Table'
import {useCart} from '../../hooks/CartContext'
import {formatPrice} from '../../utils/formatPrice'
import Trashicon from '../../assets/trash.svg'

import { ButtonGroup, EmptyCart, ProductImage, TotalPrice, TrashImage } from './styles';


export function CartItems() {

    const {cartProducts, increaseProduct, decreaseProduct, deleteProduct} = useCart();

    return(
        <Table.Root>
            <Table.Header>
                <Table.Tr>
                    <Table.Th></Table.Th>
                    <Table.Th>Itens</Table.Th>
                    <Table.Th>Preço</Table.Th>
                    <Table.Th>Quantidade</Table.Th>
                    <Table.Th>Total</Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Header>

            <Table.Body>
                {cartProducts?.length ?(
                    cartProducts.map((product)=>(
                        <Table.Tr key={product.id}>
                            <Table.Td>
                                <ProductImage src={product.url} alt="imagem do prduto" />
                            </Table.Td>
                            <Table.Td>{product.name}</Table.Td>
                            <Table.Td>{product.currencyValue}</Table.Td>
                            <Table.Td>
                                <ButtonGroup>
                                    <button onClick={() => decreaseProduct(product.id)}>-</button>
                                    {product.quantity}
                                    <button onClick={() => increaseProduct(product.id)}>+</button>
                                </ButtonGroup>
                                
                            </Table.Td>
                            <Table.Td>
                                <TotalPrice> { formatPrice(product.quantity * product.price) }</TotalPrice>
                            </Table.Td>

                            <Table.Td>
                                <TrashImage src={Trashicon} alt='Deletar pedido' onClick={ ()=> deleteProduct(product.id)}/>
                            </Table.Td>    
                        </Table.Tr> 
                    ))
                ): <EmptyCart>Carrinho</EmptyCart>}

            </Table.Body>
        </Table.Root>
    )
}