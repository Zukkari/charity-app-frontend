import {beforeEach} from "@jest/globals";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import CartTotalComponent from "./cart-total-component";
import {CartContext} from "../../context/cart-context";


let container: HTMLDivElement | null
beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
})

it("it should calculate sum of the cart", () => {
    act(() => {
        render(<CartContext.Provider value={[{
            items: [{
                productId: 1,
                price: 1.00
            }, {
                productId: 2,
                price: 2.00
            }]
        }, () => {
        }]}>
            <CartTotalComponent/>
        </CartContext.Provider>, container)
    })

    expect(container?.textContent).toBe("Total:3.00 €")
})

afterEach(() => {
    unmountComponentAtNode(container!);
    container?.remove();
    container = null;
})
