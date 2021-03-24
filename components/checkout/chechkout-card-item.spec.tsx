import {beforeEach} from "@jest/globals";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import CheckoutCardItem from "./checkout-card-item";

let container: HTMLDivElement | null
beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
})

it("it should render props", () => {
    act(() => {
        render(<CheckoutCardItem price={1.42} name={"Item"}/>, container)
    })

    expect(container?.textContent).toBe("Item 1.42€")
})

afterEach(() => {
    unmountComponentAtNode(container!);
    container?.remove();
    container = null;
})
