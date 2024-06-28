import configureStore from "redux-mock-store";
import { addCartItemToDatabase } from "../asyncActions";
import { cartSlice } from "../../../features/cartSlice";
import { Order } from "types/commonTypes";

jest.mock("firebase/database", () => ({
  get: jest.fn(),
  set: jest.fn(),
  ref: jest.fn(),
}));

const { get, set, ref } = require("firebase/database");

const initialState = {
  auth: {
    userId: "test-user-id",
    isLoggedIn: true,
    isLoading: false,
    error: null,
  },
};

const mockStore = configureStore();

describe("addCartItemToDatabase", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });

  const cartData: Order = {
    id: 1,
    name: "Test Item",
    price: 10,
    img: "test.jpg",
    quantity: 2,
  };

  it("should dispatch addToCart and update the database when item is added", async () => {
    get.mockResolvedValueOnce({ exists: () => false });
    set.mockResolvedValueOnce(null);

    await store.dispatch(
      addCartItemToDatabase(cartData, "test-user-id") as any
    );

    const actions = store.getActions();
    expect(actions[0]).toEqual(cartSlice.actions.addToCart(cartData));

    expect(ref).toHaveBeenCalledWith(
      expect.anything(),
      `cart/test-user-id/${cartData.id}`
    );
    expect(set).toHaveBeenCalledWith(expect.anything(), {
      ...cartData,
      userId: "test-user-id",
    });
  });

  it("should update existing item quantity in the database", async () => {
    get.mockResolvedValueOnce({
      exists: () => true,
      val: () => ({ ...cartData, quantity: 1 }),
    });
    set.mockResolvedValueOnce(null);

    await store.dispatch(
      addCartItemToDatabase(cartData, "test-user-id") as any
    );

    expect(ref).toHaveBeenCalledWith(
      expect.anything(),
      `cart/test-user-id/${cartData.id}`
    );
    expect(set).toHaveBeenCalledWith(expect.anything(), {
      ...cartData,
      quantity: 3,
      userId: "test-user-id",
    });
  });

  it("should dispatch cartFailure on error", async () => {
    const error = new Error("Test error");
    get.mockRejectedValueOnce(error);

    await store.dispatch(
      addCartItemToDatabase(cartData, "test-user-id") as any
    );

    const actions = store.getActions();
    expect(actions[0]).toEqual(cartSlice.actions.cartFailure(error));
  });
});
