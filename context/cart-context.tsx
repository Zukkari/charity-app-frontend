import {Product} from "../service/product-service";
import React from "react";

export interface Cart {
    cartId: number
    products: Product[]
}

type CartState = [Cart, React.Dispatch<React.SetStateAction<Cart>>]

export const CartContext = React.createContext<CartState>([{
    cartId: 0,
    products: []
}, _ => {
}])
