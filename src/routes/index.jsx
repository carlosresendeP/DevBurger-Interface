import { Route, Routes } from "react-router-dom";

import {Login, Register, Home, Menu, Cart, Checkout, CompletePayment, Orders, NewProduct, EditProduct, Products  } from "../containers";

//import { Header } from '../components/Header';
//import { Footer } from "../components/Footer";
import { UserLayout } from "../layouts/UserLayout";
import { AdminLayout } from "../layouts/AdminLayout";

export function Router() {


    return(

        <Routes>
            {/* aqui vai os arquivos do outled do usuario*/ }
            <Route path="/" element={<UserLayout/>}>
                <Route path="/" element={<Home />} ></Route>
                <Route path="/Cardapio" element={<Menu />} ></Route>
                <Route path="/carrinho" element={<Cart />} ></Route>
                <Route path="/checkout" element={<Checkout />} ></Route>
                <Route path="/complete" element={<CompletePayment />} ></Route>
            </Route>

            <Route path="/admin" element={<AdminLayout/>}>
                <Route path="/admin/pedidos" element={<Orders />}></Route>
                <Route path="/admin/editar-produto" element={<EditProduct/>}></Route>
                <Route path="/admin/novo-produto" element={<NewProduct/>}></Route>
                <Route path="/admin/produtos" element={<Products />}></Route>
            </Route>


            {/*aqui vai os arquivos que não usan o outlet */}
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
        </Routes>
    )
}


/*
export const router =  createBrowserRouter([
    {
        path: "/",
        element:(
            <>
                <Header />
                <Home />,
                <Footer></Footer>
            </>
        ) 
        

    },
    {
        path: "/login",
        element: <Login />,
    },

    {
        path: "/cadastro",
        element: <Register />,
    },

    {
        path: "Cardapio",
        element:
        <>
            <Header />
            <Menu />,
        </>,
    },

    {
        path: "/carrinho",
        element: <Cart />,
    },
    {
        path: "/checkout",
        element: <Checkout />,
    },
    {
        path: "/complete",
        element: <CompletePayment/>,
    }



]);*/