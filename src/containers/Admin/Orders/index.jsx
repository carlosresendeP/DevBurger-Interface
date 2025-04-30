import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Row } from './row';
import {api} from '../../../services/api';
import { useEffect, useState } from 'react';
import {OrderStatusOptions} from './orderStatus';
import { Filter, FilterOption } from './styles';



export function Orders() {

    const [orders, setOrders] = useState([]) //BACKUP
    const [filteredOrders, setfilteredOrders] = useState([]) // OS VALORES QUE SERAO MOSTRADOS NA TABELA
    const [activeStatus, setActiveStatus] = useState(0) // O STATUS QUE ESTA ATIVO NO MOMENTO

    const [rows, setRows] = useState([])

    //pegar informaçoes da api
    useEffect(() => {

        async function LoadOrders(){
            const {data} = await api.get('/orders')

            setOrders(data)
            setfilteredOrders(data)

            //console.log(data)
        }


        LoadOrders()
    }, [])


    //criar as informaçoes que serao mostradas na tabela com base no material ui
    function createData(orders) {

        return {
            name: orders.user.name,
            orderId: orders._id,
            date: orders.createdAt,
            status: orders.status,
            products: orders.products,

        };
    }

    //setar as informaçoes no rows
    useEffect(() => {
        const newRows = filteredOrders.map(order => createData(order));

        setRows(newRows);
    }, [filteredOrders])

    function handleStatus(status) {
        if (status.id === 0) {
            setfilteredOrders(orders)
        }else{
            const newOrders =  orders.filter(order => order.status === status.value);

            setfilteredOrders(newOrders)
        }

        setActiveStatus(status.id) //seta o status ativo

    }

    //quando o orders mudar, ele vai filtrar os pedidos de acordo com o status ativo
    useEffect(() => {
        if (activeStatus === 0){
            setfilteredOrders(orders);
        }else{
            const statusIndex = OrderStatusOptions.findIndex ((item) => item.id === activeStatus ) //pega o index do status ativo

            
            const newFiltredOrders =  orders.filter(
                (order) => order.status === OrderStatusOptions[statusIndex].value //filtra os pedidos de acordo com o status ativo
            )

            console.log(newFiltredOrders);
            setfilteredOrders(newFiltredOrders)
        }
    }, [orders])
    


    return (
        <>
            <Filter>
                {OrderStatusOptions.map((status) => (
                    <FilterOption 
                    key={status.id}
                    onClick={()=> handleStatus(status)}
                    $isActiveStatus={activeStatus === status.id} //verifica se o status é o ativo
                    >
                    {status.label}
                    
                    </FilterOption>
                ))}
            </Filter>

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Pedidos</TableCell>
                            <TableCell>cliente</TableCell>
                            <TableCell>Data do Pedido</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row 
                            key={row.orderId} 
                            row={row}
                            orders={orders}
                            setOrders={setOrders}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}