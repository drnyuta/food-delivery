import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MenuPage } from "./../MenuPage";
import { cartSlice } from "../../../features/cartSlice";

const mockStore = configureStore();

describe("MenuPage", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      menu: {
        menu: [
          {
            id: 1,
            meal: "Test Meal",
            price: 10,
            img: "testImage.jpg",
            instructions: "Test instructions",
            category: "Dinner",
          },
        ],
        isLoading: false,
        error: null,
      },
      auth: {
        userId: "testUserId",
      },
    });
  });

  it('should update newCartValue when "Add to cart" button is clicked', () => {
    render(
      <Provider store={store}>
        <MenuPage newCartValue={0} setNewCartValue={() => {}} />
      </Provider>
    );

    const addToCartButton = screen.getByText("Add to cart");
    fireEvent.click(addToCartButton);

    const expectedActions = [
      { type: cartSlice.actions.addToCart.type, payload: expect.any(Object) },
    ];
    expect(store.getActions()).toEqual(expectedActions);

    const newState = store.getState();
    expect(newState.newCartValue).toBeGreaterThan(0);
  });
});
