import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CheckCircle, Pencil, XCircle } from '@phosphor-icons/react';

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { api } from "../../../services/api";
import { Container, EditButton, ProductImage } from "./styles";
import { formatPrice } from "../../../utils/formatPrice";



export function Products() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    //useEffect é chamado assim que o componente é montado na tela
    useEffect(() => {

        async function loadProducts() {
            const { data } = await api.get('/products');

            setProducts(data);
        }

        loadProducts();
    }, [])

    //verfica se o produto está em oferta ou não
    function isOffer(offer) {
        if (offer) {
            return <CheckCircle color='#61a120'  size='28px' />;
        } else {
            return <XCircle color='#ff3205' size='28px' />;
        }
    }

    //funçãoi para editar o produto
    function editProduct(produto) {
        navigate(`/admin/editar-produto`, {state: { produto }}); //passa o produto para a página de edição
    }


    return (
        <Container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell align="center">Preço</TableCell>
                            <TableCell align="center">Produto em Oferta</TableCell>
                            <TableCell align="center">Imagem do Produto</TableCell>
                            <TableCell align="center">Editar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((products) => (
                            <TableRow
                                key={products.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {products.name}
                                </TableCell>
                                <TableCell align="center">{formatPrice(products.price)}</TableCell>
                                <TableCell align="center">{isOffer(products.offer)}</TableCell>
                                <TableCell align="center">
                                    <ProductImage src={products.url} /> 
                                </TableCell>
                                <TableCell align="center">
                                    <EditButton onClick={() => editProduct(products)}>
                                        <Pencil /> {/*icon*/ }
                                    </EditButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );

}