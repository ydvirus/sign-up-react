import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import SignUp from "./SignUp";
import user from "@testing-library/user-event";

import store from "../redux/store";
import "@testing-library/jest-dom";

const renderComponent = () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    </Provider>
  );

afterEach(cleanup);

describe("Sign-Up page", () => {
  test("should render correctly", () => {
    //Arrange
    renderComponent();
    //render(<SignUp />);

    //Act
    const signUpElement = screen.getByRole("heading", {
      level: 1,
      name: "Sign Up",
    });

    //Assert
    expect(signUpElement).toBeInTheDocument();

    const signUpWithElement = screen.getByRole("heading", {
      level: 2,
      name: "Sign up with",
    });
    expect(signUpWithElement).toBeInTheDocument();

    const signUpWithGBtn = screen.getByRole("button", {
      name: "Sign up with Google",
    });
    expect(signUpWithGBtn).toBeInTheDocument();

    const signUpWithFBtn = screen.getByRole("button", {
      name: "Sign up with Facebook",
    });
    expect(signUpWithFBtn).toBeInTheDocument();

    const inputFields = screen.getAllByRole("textbox");
    expect(inputFields).toHaveLength(2);

    const passwordField = screen.getByLabelText("Password", {
      selector: "input",
    });
    expect(passwordField).toBeInTheDocument();

    const checkboxElement = screen.getByRole("checkbox", {
      name: /i've read and agree with terms of service and our privacy policy/i,
    });
    expect(checkboxElement).toBeInTheDocument();

    const submitButton = screen.getByTestId("EastIcon");
    expect(submitButton).toBeInTheDocument();
  });

  test("should show errors after blur on input fields without giving any value", async () => {
    user.setup();
    renderComponent();

    const nameElement = screen.getByLabelText("Name", { selector: "input" });
    await user.click(nameElement); // click on name input field

    const emailElement = screen.getByLabelText("Email", { selector: "input" });
    await user.click(emailElement); // click on email input field

    const nameError = screen.getByText(
      "* Only alphabetic names allowed with atleast 3 characters",
      { selector: "p" }
    );
    expect(nameError).toBeInTheDocument(); // name Input field should show error

    const passwordField = screen.getByLabelText("Password", {
      selector: "input",
    });
    await user.click(passwordField); // click on password field

    const emailError = screen.getByText("* Invalid email format", {
      selector: "p",
    });
    expect(emailError).toBeInTheDocument(); // email field should show error

    await user.click(nameElement); // click name field

    const passwordError = screen.getByText(
      "Password size should be between 8-15 characters",
      { selector: "p", exact: false }
    );
    expect(passwordError).toBeInTheDocument(); // password field should show error
  });

  test("should call submit method on click Submit icon", async () => {
    user.setup();
    renderComponent();
    const logSpy = jest.spyOn(console, "log");
    const submitButton = screen.getByTestId("EastIcon");
    fireEvent.click(submitButton)
    expect(logSpy).toHaveBeenCalledTimes(1);
    
  });

  test("should update state on onChange", async ()=>{
    user.setup();
    renderComponent();
    const setSignUpData = jest.fn()
    const signUpDataState= jest.spyOn(React, "useState")
    const signUpData = {}
    signUpDataState.mockImplementation( () => [signUpData, setSignUpData])
    const nameElement = screen.getByLabelText("Name", { selector: "input" });
    await user.type(nameElement, "a")
    expect(nameElement.value).toBe("a")
  })
});
