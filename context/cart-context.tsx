import React from "react";
import {Cart} from "../schema";


type CartState = [Cart, React.Dispatch<React.SetStateAction<Cart>>]

export const CartContext = React.createContext<CartState>([
    {},
    _ => {
    }
])
