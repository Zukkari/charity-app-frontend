import {beforeEach} from "@jest/globals";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import ShoppingCartButton from "./shopping-cart-button";


let container: HTMLDivElement | null
beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
})

it("should contain link to the shopping cart", () => {
    act(() => {
        render(<ShoppingCartButton/>, container)
    })

    const link = container?.getElementsByTagName("a")[0]
    expect(link?.href).toContain("/payment")
})

it("should contain shopping cart icon", () => {
    act(() => {
        render(<ShoppingCartButton/>, container)
    })

    const image = container?.getElementsByTagName("img")[0]
    expect(image?.src).toContain("/shopping-cart.png")
    expect(image?.alt).toBe("Image of a shopping cart")
})

afterEach(() => {
    unmountComponentAtNode(container!);
    container?.remove();
    container = null;
})
