// app provider vai conter todos os providers que a aplicação vai utilizar
//import ele na pasta main e coloque ele por volta de todos os componentes

import { UserProvider } from "./UserContext.jsx";
import { CartProvider } from "./CartContext.jsx";

const AppProvider = ({ children }) => {

    return (
    <UserProvider> 
        <CartProvider>{children}</CartProvider>
    </UserProvider>)

    
}

export default AppProvider;