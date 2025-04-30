import { Outlet, Navigate } from "react-router-dom";
import { SideNavAdmin } from "../../components";
import { Container } from "../AdminLayout/styles";

export function AdminLayout() {

    //admin layout resposavel para verificar se o usuario é admin e redirecionar para a pagina de login ou para a pagina de admin
    //const isAdmin = true;
    const {admin: isAdmin} = JSON.parse(localStorage.getItem('devburger:userData'));
    
    //se for admin é redirecionado para a pagina de admin se não for redirecionado para a pagina de login
    return isAdmin ? (
        <Container>

            <SideNavAdmin />
            <main>
                <section>
                    <Outlet />
                </section>
            </main>

        </Container>
    )

    : (
        <Navigate to="/login" />
    )   
}