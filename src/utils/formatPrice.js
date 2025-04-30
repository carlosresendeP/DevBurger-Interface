// 1. Vai ser uma função que vai receber um valor e vai retornar o valor formatado em reais
// 2. Vamos usar a função Intl.NumberFormat para formatar o valor em reais
export const formatPrice = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style:  'currency',
        currency: 'BRL',
    
    }).format(value/100)
};