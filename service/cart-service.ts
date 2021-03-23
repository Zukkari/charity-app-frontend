import {Cart, CartApi, createConfiguration} from "../schema";

const config = createConfiguration();
const api = new CartApi(config)

const CartService = {
    createNewCart: async function (): Promise<Cart> {
        return await api.createNewCart()
    },

    bookItem: async function (cartId: number, productId: number): Promise<Cart> {
        return await api.bookItem(cartId, {
            productId: productId
        })
    },

    getCart: async function (cartId: number): Promise<Cart> {
        return await api.getCart(cartId)
    },

    deleteCart: async function (cartId: number): Promise<void> {
        return await api.deleteCart(cartId)
    },

    payOrder: async function (cartId: number, payment: number): Promise<Cart> {
        return await api.checkout(cartId, {
            amount: payment
        })
    }
}

export default CartService
