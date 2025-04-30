import axios from "axios";


export const api = axios.create({
    baseURL: 'http://localhost:3001'
});

api.interceptors.request.use((config)=>{
    //const token = localStorage.getItem('token');
    const userData = localStorage.getItem('devburger:userData');

    const token = userData && JSON.parse(userData).token; //se userData for verdadeiro, pega o token do objeto userData e transforma em JSON(parse)

    config.headers.authorization = `Bearer ${token}`;

    
    return config;
});