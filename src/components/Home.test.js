import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../redux/store";
import Home from "./Home";
// import * as reactRedux from "react-redux";
import "@testing-library/jest-dom"

describe("Home", () => {
//   const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
//   const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
//   beforeEach(() => {
//     useSelectorMock.mockClear();
//     useDispatchMock.mockClear();
//   });

  test("renders correctly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
    
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();

    const goToLink = screen.getByRole('heading', {
        name: /go to login/i
    })
    expect(goToLink).toBeInTheDocument()
  });
});
