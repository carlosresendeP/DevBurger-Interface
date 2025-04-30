import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Image } from "@phosphor-icons/react/dist/ssr"
import { Container, InputGroup, Label, LabelUpload, Input ,Select,SubmitButton, Form, ErrorMessage, ContainerCheckbox } from "./styles"
import { useEffect, useState } from "react"
import { api } from "../../../services/api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"


const schema = yup
    .object({
        name: yup.string().required('Digite o nome do produto'),
        price: yup.number().positive().required('digite o preço do produto').typeError('Digite o preço do produto'),
        categoty: yup.object().required('Selecione uma categoria'),
        offer: yup.boolean(),
        file: yup
        .mixed()
        .test('required', 'Escolha uma imagem para Continuar', (value) => {
            return value && value.length > 0;
        })
        .test('fileSize', 'A imagem deve ter menos de 3MB', (value) => {
            return value && value.length > 0 && value[0].size <= 3000000;
        })
        .test('type', 'A imagem deve ser do tipo PNG, JPEG, JPG', (value) => {
            return value && value.length > 0 && (value[0].type === 'image/png' || value[0].type === 'image/jpeg' || value[0].type === 'image/jpg');
        })
    })



export function NewProduct() {

    const [fileName, setFileName] = useState(null)
    const [categories, setcategories] = useState('')

    const navigate = useNavigate()

    //verificar na api as categorias
    useEffect(() => {

        async function loadCategories(){
            const {data} = await api.get('/categories')

            
            setcategories(data)
        }

        loadCategories()

    }, [])


    

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = async (data) => {
        const newFormData =  new FormData()

        newFormData.append('name', data.name)
        newFormData.append('price', data.price * 100)
        newFormData.append('category_id', data.categoty.id)
        newFormData.append('file', data.file[0])
        newFormData.append('offer', data.offer)

        await toast.promise(api.post('/products', newFormData),{
            pending: 'Adicionando produto...',
            success: 'Produto adicionado com sucesso!',
            error: 'Erro ao adicionar produto'
        })

        //navegar para a página de produtos
        setTimeout(() => {
            navigate('/admin/produtos')
        }, 2000)
    }

    return (
        <>  
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputGroup>
                        <Label>
                            Nome
                        </Label>
                        <Input type="text" {...register("name")}/>
                        <ErrorMessage>{errors.name?.message}</ErrorMessage>
                    </InputGroup>

                    <InputGroup>
                        <Label>
                            Preço
                        </Label>
                        <Input type="number" {...register("price")}/>
                        <ErrorMessage>{errors.price?.message}</ErrorMessage>
                    </InputGroup>

                    <InputGroup>
                        <LabelUpload>
                            <Image /> {/*icone*/}
                            <input 
                            type="file"
                            {...register("file")}
                            accept="image/png, image/jpeg, image/jpg" 
                            /*aceitar apenas esses tipos de imagem*/
                            onChange={(value) =>{
                                setFileName(value?.target?.files[0]?.name) //pegar o nome do arquivo
                                register('file').onChange(value) //pegar o valor do arquivo
                            }}
                            />
                            {fileName || 'Upload do Produto'}
                        </LabelUpload>

                        <ErrorMessage>{errors.file?.message}</ErrorMessage>
                    </InputGroup>

                    <InputGroup>
                        <Label>
                            Categoria
                        </Label>

                        <Controller 
                            name='categoty'
                            control={control} //controlar o valor do select
                            render={({field})=> (   
                            <Select 
                                {...field} //vai espalhar o valor do select
                                
                                options={categories}
                                getOptionLabel={categories => categories.name} //o usuário vai ver o nome
                                getOptionValue={categories => categories.id}//o que vai ser salvo no banco de dados
                                placeholder="Selecione uma categoria"
                                menuPortalTarget={document.body} //para abrir o menu em cima do input
                            />

                        )}/>
                        <ErrorMessage>{errors.categoty?.message}</ErrorMessage>
                    </InputGroup>

                    <InputGroup>
                        <ContainerCheckbox>
                            <input type="checkbox" {...register("offer")} />
                            <Label>Produto em Oferta ? </Label>
                        </ContainerCheckbox>
                    </InputGroup>

                    <SubmitButton type="submit">Adicionar Produto</SubmitButton>
                </Form>

            </Container>
        </>
    )

}