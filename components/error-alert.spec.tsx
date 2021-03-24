import {beforeEach} from "@jest/globals";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import ErrorAlert from "./error-alert";


let container: HTMLDivElement | null
beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
})

it("should contain passed error message", () => {
    act(() => {
        render(<ErrorAlert header={"Header"} message={"Message"}/>, container)
    })

    expect(container?.textContent).toContain("Header")
    expect(container?.textContent).toContain("Message")
})


afterEach(() => {
    unmountComponentAtNode(container!);
    container?.remove();
    container = null;
})
