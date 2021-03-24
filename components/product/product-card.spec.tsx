import {beforeEach} from "@jest/globals";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import ProductCard from "./product-card";


let container: HTMLDivElement | null
beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
})

jest.mock("../../service/event-service", () => {
    return {
        subscribe: () => {
        }
    }
})

it("should contain required parts of the card", () => {
    act(() => {
        render(<ProductCard
            image={{path: "image-path", altText: "Alternative text", credit: "Author credit"}} name={"Product 1"}
            price={13.37} productId={1} quantity={420}
        />, container)
    })

    expect(container?.textContent).toContain("Product 1")
    expect(container?.textContent).toContain("Products in stock: 420")
    expect(container?.textContent).toContain("Add to cart")
})


afterEach(() => {
    unmountComponentAtNode(container!);
    container?.remove();
    container = null;
})
