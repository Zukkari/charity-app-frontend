import {beforeEach} from "@jest/globals";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import {Product} from "../../schema";
import ProductList from "./product-list";


let container: HTMLDivElement | null
beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
})

jest.mock("../../service/product-service", () => {
    return {
        getAllProducts: async function (): Promise<Product[]> {
            return [
                {
                    productId: 1,
                    name: "Product 1",
                    quantity: 999,
                    price: 13.37
                },
                {
                    productId: 2,
                    name: "Product 2",
                    quantity: 888,
                    price: 14.48
                }
            ]
        }
    }
})

jest.mock("../../service/image-service", () => {
    return {
        getImage: (id: number) => {
            return {
                path: "path",
                credit: "credit",
                altText: "string"
            }
        }
    }
})

jest.mock("../../service/event-service", () => {
    return {
        subscribe: () => {
        }
    }
})

it("it should render its children based on received products", async () => {
    await act(async () => {
        render(<ProductList/>, container)
    })

    expect(container?.textContent).toContain("Product 1")
    expect(container?.textContent).toContain("999")
    expect(container?.textContent).toContain("13.37")

    expect(container?.textContent).toContain("Product 2")
    expect(container?.textContent).toContain("888")
    expect(container?.textContent).toContain("14.48")
})


afterEach(() => {
    unmountComponentAtNode(container!);
    container?.remove();
    container = null;
})
