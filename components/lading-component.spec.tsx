import {beforeEach} from "@jest/globals";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import LoadingComponent from "./loading-component";


let container: HTMLDivElement | null
beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
})

it("should contain loading text", () => {
    act(() => {
        render(<LoadingComponent text={"This is a loading text"}/>, container)
    })

    expect(container?.textContent).toContain("This is a loading text")

    const loadingSpinner = container?.getElementsByTagName("img")[0];
    expect(loadingSpinner?.src).toContain("/spinner.svg")
    expect(loadingSpinner?.alt).toContain("Pulsing loader")
})


afterEach(() => {
    unmountComponentAtNode(container!);
    container?.remove();
    container = null;
})
