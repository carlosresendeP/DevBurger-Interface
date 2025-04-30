//responsavel por criar o contexto do usuario
//aqui é onde vai ficar as informações do usuario logado


import { createContext, useContext, useState, useEffect } from "react";

// Cria o contexto do usuário
const UserContext = createContext();

// Provedor do contexto do usuário
export const UserProvider = ({ children }) => {
    // Estado que armazena as informações do usuário
    const [infoUser, setInfoUser] = useState({});

    //função para verificar se o usuário já está logado, se sim, salva no localstorage
    const putUserData =(userInfo => {

        setInfoUser(userInfo)

        localStorage.setItem('devburger:userData', JSON.stringify(userInfo)) //salva no localstorage, stringfy transforma o objeto em string
    } )

    //função para deslogar o usuário
    const logout = () => {  
        setInfoUser({})
        localStorage.removeItem('devburger:userData')
    }

    //quando a tela carregar, verifica se tem algum dado no localstorage
    useEffect(() => {
        const userInfoLocalStorage = localStorage.getItem('devburger:userData')

        if(userInfoLocalStorage){
            setInfoUser(JSON.parse(userInfoLocalStorage))//transforma a string em objeto
        }
    },[])
    
    

    
    // Retorna o provedor do contexto com o valor do usuário
    return(
        <UserContext.Provider value={{infoUser, putUserData, logout}}>{children}</UserContext.Provider>
    )
};

// Hook personalizado para usar o contexto do usuário
export const useUser = () => {
    // Obtém o contexto do usuário
    const context = useContext(UserContext);
    // Verifica se o hook está sendo usado dentro de um UserProvider
    if(!context){
        throw new Error("useUser must be used within a UserProvider");
    }
    
    return context;
}