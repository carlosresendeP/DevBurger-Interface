import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom"

import { Container, Form, InputContainer, LeftContainer, RightContainer, Title, Link } from './styles';
import Logo from '../../assets/logo.svg';
import { Button } from '../../components/Button'
import {api} from '../../services/api'
import { useUser } from "../../hooks/UserContext"
import { use } from "react"




export function Login() {
    const navigate = useNavigate();
    const {putUserData} = useUser(); //pegar somente a função putUserData do contexto do usuário


    //visite o site https://react-hook-form.com/get-started#SchemaValidation
    //validação do formulário
    const schema = yup
    .object({
        email: yup
        .string()
        .email('Digite em e-mail válido').required('O e-mail é obrigatório'),
        password: yup
        .string()
        .min(6, 'A senha deve ter no minimo 6 caracteres')
        .required('Digite uma senha'),
    })
    .required()

    //variavel para validar o formulário com o useForm
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema), //validar o schema com o yup
    })

    //função para enviar os dados do formulário
    // e fazer um feddback para o usuário com o toast
    const onSubmit = async (data) => {
    
        //{data: {token}} é a desestruturação do objeto, pegando o token do objeto data
        const {data: userData,} = await toast.promise(
            api.post('/session', {
            email: data.email,
            password: data.password,


        }),
        
        {
            pending: 'Verificando seus dados...',
            success: {
                render() {
                    setTimeout(() => {

                        if (userData?.admin) {
                            navigate('/admin/pedidos') //redireciona para a página de admin
                        }
                        else(
                            navigate('/') //redireciona para a home
                        )
                        
                    }, 2000);
                    return 'Seja Bem-vindo';
                }
            },
            error: 'Email ou Senha Incorretos 🤯'
        }
        );

        putUserData(userData) //envia os dados do usuário para o contexto
        //localStorage.setItem('token', token)

    }


    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt='Logo-devburger' />
            </LeftContainer>
            <RightContainer>
                <Title>
                    Olá, seja bem vindo ao <span>Dev Burguer!</span>
                    <br />
                    Acesse com seu <span> Login e senha.</span>
                </Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer >
                        <label>Email</label>
                        <input type="email" {...register("email")}/>
                        <p>{errors?.email?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label>Senha</label>
                        <input type="password" {...register("password")} />
                        <p>{errors?.password?.message}</p>
                    </InputContainer>

                    {/* <Link>Esqueci minha senha.</Link> */}

                    <Button type="submit" >Entrar</Button>
                    {/*<Button type="submit" red={false}>Entrar</Button>*/}
                </Form>

                <p>Não possui conta? <Link to={'/cadastro'}>Clique aqui.</Link></p>
            </RightContainer>
        </Container>

    );
}