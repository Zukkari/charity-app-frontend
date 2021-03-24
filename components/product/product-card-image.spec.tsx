import {beforeEach} from "@jest/globals";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import ProductCardImage from "./product-card-image";


let container: HTMLDivElement | null
beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
})

it("should contain link to provided image", () => {
    act(() => {
        render(<ProductCardImage
            image={{path: "image-path", altText: "Alternative text", credit: "Author credit"}} handler={_ => {
        }} quantity={1}/>, container)
    })

    const link = container?.getElementsByTagName("img")[0]
    expect(link?.src).toContain("/image-path")
    expect(link?.alt).toBe("Alternative text")
})


afterEach(() => {
    unmountComponentAtNode(container!);
    container?.remove();
    container = null;
})
