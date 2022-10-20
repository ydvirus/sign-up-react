import { render, screen, cleanup } from "@testing-library/react"
import InputField from "./InputField"
import user from '@testing-library/user-event'
import "@testing-library/jest-dom";

afterEach(cleanup)

describe("InputField component", ()=>{
    
    const input = {
        id: "name",
        name: "name",
        label: "Name",
        type: "text",
        errorMsg: "* Only alphabetic names allowed with atleast 3 characters",
        smValue: 6,
        className: "signup-input name-input",
        pattern: "^[A-Za-z ]{3,50}$",
        required: true,
  
      }
      const handleChange = jest.fn()
    //   render(<InputField {...input} value="Yusuf" onChange={handleChange}/>)
    
    test("should render correctly", ()=>{
        render(<InputField {...input} value="Yusuf" onChange={handleChange}/>)
        const inputElement = screen.getByRole("textbox")
        expect(inputElement).toBeInTheDocument()
        // eslint-disable-next-line testing-library/no-debugging-utils
        //screen.debug()
    })

    test("should call handleChange function when something is input", async ()=>{
        user.setup()
        render(<InputField {...input} value="" onChange={handleChange}/>)
        const inputElement = screen.getByRole("textbox")
        await user.type(inputElement, "a")
        // eslint-disable-next-line testing-library/no-debugging-utils
        //screen.debug()
        expect(handleChange).toHaveBeenCalledTimes(1)
    })
})