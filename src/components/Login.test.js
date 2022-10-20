import { render, screen, cleanup, fireEvent} from "@testing-library/react"
import '@testing-library/jest-dom'
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import store from "../redux/store"
import Login from "./Login"
import user from '@testing-library/user-event'

const renderComponent =(children)=>{
    return render(
    <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
    </Provider>
    )
}

describe("Login", ()=>{
    it("renders correctly", ()=>{
        renderComponent(<Login />)
        // eslint-disable-next-line testing-library/no-debugging-utils
        //screen.debug()

        const emailInput = screen.getByRole('textbox')
        expect(emailInput).toBeInTheDocument();
        const passwordInput = screen.getByLabelText("Password", { selector: 'input'})
        expect(passwordInput).toBeInTheDocument(); 
        const heading = screen.getByRole('heading', {
            name: /login/i
          })
        expect(heading).toBeInTheDocument()
        const submitButton = screen.getByRole('button')
        expect(submitButton).toBeInTheDocument()
    })

    it("input in textbox and password should update state",async ()=>{
        user.setup()
        renderComponent(<Login/>)

        const emailInput = screen.getByRole('textbox')
        await user.type(emailInput, "abcd")
        const passwordInput = screen.getByLabelText("Password", { selector: 'input'})
        await user.type(passwordInput, "aBcD@123")

        expect(emailInput.value).toBe("abcd")
        expect(passwordInput.value).toBe("aBcD@123")
    })

    it("onclicking submit button, onSubmit method should be called", ()=>{
        user.setup()
        renderComponent(<Login/>)
        const logSpy = jest.spyOn(console, "log")

        const submitButton = screen.getByRole('button')
        fireEvent.click(submitButton)
        expect(logSpy).toHaveBeenCalledTimes(1)

    })
})
