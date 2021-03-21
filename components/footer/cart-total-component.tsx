import {useContext} from "react";
import {CartContext} from "../../context/cart-context";

const CartTotalComponent = () => {
    const [cart] = useContext(CartContext)
    const total = cart.products.map(product => product.price).reduce((left, right) => left + right, 0.00).toPrecision(4)

    return <div className={"text-white text-xl mr-12"}>
        <span className={"px-3 inline-block"}>Total:</span>
        <span className={"inline-block"}>{total} €</span>
    </div>
}

export default CartTotalComponent
