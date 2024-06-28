import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Cart } from "../Cart";
import { initialState } from "../../../features/cartSlice";

const mockStore = configureStore([]);
const store = mockStore(initialState);

describe("Cart", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByAltText("cart")).toBeInTheDocument();
  });

  it("should have link to Order page", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Cart />
      </MemoryRouter>
    );

    const link = screen.getByTestId("order-page-link");

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/order");
  });
});
