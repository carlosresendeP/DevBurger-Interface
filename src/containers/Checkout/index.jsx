import { useLocation } from "react-router-dom"
import stripePromise from "../../config/stripeConfig.js";
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm  from "../../components/Stripe/CheckoutForm";

export function Checkout(){


    const {state: {clientSecret}} = useLocation();
    //console.log(clientSecret);
    
    

    if(!clientSecret){
        return <div>Erro tente novamente!</div>
    }
    

    return(
        <Elements stripe={stripePromise} options={{clientSecret}}>
            <CheckoutForm/> 
        </Elements>
        
    )
}