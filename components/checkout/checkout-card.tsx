import React, {useContext, useState} from "react";
import {CartContext} from "../../context/cart-context";
import CheckoutCardItem from "./checkout-card-item";
import CartService from "../../service/cart-service";
import {Transition} from "@tailwindui/react";
import ErrorAlert from "../error-alert";

interface IFormError {
    message: string,
    header: string,
    show: boolean
}

const emptyError: IFormError = {
    header: "", message: "", show: false
}

/**
 * Actually not accurate to calculate money to be returned in TS, should be done on backend using BigDecimals (to not lose precision)
 *
 * @constructor
 */
const CheckoutCard = () => {
    const [cart, setCart] = useContext(CartContext);

    const [isEnabled, setEnabled] = useState(true)

    const customerPaid = cart.paidTime !== undefined && cart.paidTime !== null

    const [amountToPay, setAmountToPay] = useState<number>(0)

    const [error, setError] = useState(emptyError)

    const deleteCart = () => {
        CartService.deleteCart(cart.id!)
            .then(_ => {
                return CartService.createNewCart()
            })
            .then(c => {
                setCart(c)
                sessionStorage.setItem("cartId", c.id!.toString())
            })
    }

    const payCart = () => {
        setEnabled(false)

        CartService.payOrder(cart.id!, amountToPay)
            .then(c => {
                setCart(c)
                console.log("Payment succeeded: " + c)
            })
            .catch(e => {
                console.log("Error while processing payment", e)
                setError({
                    header: "Error", message: "Something went wrong with the payment!", show: true
                })

                setTimeout(() => {
                    setError(emptyError)
                }, 10_000)

                setEnabled(true)
            })
    }

    const maybeToPay = cart.items?.map(item => item.price!).reduce((left, right) => left + right, 0)
    const toPay = maybeToPay ? maybeToPay : 0

    return <div className={"flex flex-col m-auto w-5/6 h-2/3 shadow-lg"}>
        <Transition show={error.show}
                    enter="transition-opacity duration-250"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-250"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
            <div className={"absolute w-5/6"}>
                <ErrorAlert header={error.header} message={error.message}/>
            </div>
        </Transition>

        <h1 className={"text-gray-600 text-bold w-full pt-2 font-semibold text-center"}>Checkout</h1>

        <div className={"mt-4 h-32 max-h-32 overflow-y-auto"}>
            <h2 className={"text-gray-600 text-bold w-full pt-2 font-semibold text-center"}>Items in cart</h2>
            {cart.items?.map(product => <CheckoutCardItem key={product.id} name={product.productName!}
                                                          price={product.price!}/>)}
        </div>

        <div className={"mt-4"}>
            <h2 className={"text-gray-600 text-bold w-full pt-2 font-semibold text-center"}>Payment section</h2>
            <div className={"w-full text-center"}>
                <input className={"w-2/3 px-2 py-2 text-gray-700 bg-gray-200 rounded mt-2 max-w-sm"} type={"number"}
                       placeholder={"Enter the sum here..."}
                       onChange={(e) => {
                           const value = e.target.value;
                           if (value === "") {
                               setAmountToPay(0)
                               return
                           }

                           const asNumber = Number.parseFloat(value)
                           setAmountToPay(asNumber)
                       }}
                       value={customerPaid ? cart.paidAmount : undefined}
                       readOnly={customerPaid}/>
            </div>
        </div>

        <div className={"flex flex-col w-full mt-2"}>
            <button
                className={"px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded w-48 m-auto mt-4 disabled:opacity-50"}
                disabled={(amountToPay <= toPay && isEnabled) || customerPaid || toPay <= 0}
                onClick={(e) => payCart()}>Pay
            </button>
            <button onClick={(e) => deleteCart()}
                    className={"px-4 py-1 text-white font-light tracking-wider bg-red-900 rounded w-48 m-auto mt-4"}>Reset
                cart
            </button>
        </div>

        {customerPaid ?
            <div className={"mt-2 w-full"}>
                <div className={"m-auto text-center w-2/3"}>
                    Customer should receive payback of {(cart.paidAmount! - cart.total!).toFixed(2)}€
                </div>
            </div>
            : <></>}
    </div>
}

export default CheckoutCard
