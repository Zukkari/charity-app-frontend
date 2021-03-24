import {beforeEach} from "@jest/globals";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import Header from "./header";


let container: HTMLDivElement | null
beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
})

it("should contain app text with link to root context", () => {
    act(() => {
        render(<Header/>, container)
    })

    expect(container?.textContent).toBe("Charify")

    const link = container?.getElementsByTagName("a")[0]
    expect(link?.href).toMatch(new RegExp("https?://.+?/"))
})

afterEach(() => {
    unmountComponentAtNode(container!);
    container?.remove();
    container = null;
})
