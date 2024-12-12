import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CartScreen from "../../../screens/AppScreens/CartScreen";
import { CartContext } from "../../../context/CartContext";
import { ThemeContext } from "../../../context/themeContext";

describe("CartScreen", () => {
  const mockClearCart = jest.fn();
  const mockGetTotal = jest.fn();

  const cartMockData = [
    {
      id: 1,
      title: "Product 1",
      price: 10.0,
      quantity: 2,
      image: ["https://via.placeholder.com/80"],
      thumbnail: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      title: "Product 2",
      price: 20.0,
      quantity: 1,
      image: ["https://via.placeholder.com/80"],
      thumbnail: "https://via.placeholder.com/80",
    },
  ];

  const mockTheme = {
    background: "#f9f9f9",
    text: "#000",
    card: "#fff",
    primary: "#6200EE",
    title: "#fff",
  };

  const renderComponent = (cart = cartMockData) =>
    render(
      <ThemeContext.Provider value={{ theme: mockTheme }}>
        <CartContext.Provider
          value={{
            cart,
            clearCart: mockClearCart,
            getTotal: mockGetTotal.mockReturnValue(cart.reduce((acc, item) => acc + item.price * item.quantity, 0)),
          }}
        >
          <CartScreen />
        </CartContext.Provider>
      </ThemeContext.Provider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders cart items correctly", () => {
    const { getByText, getAllByText, getByTestId } = renderComponent();

    // Check cart item details
    expect(getByText("Product 1")).toBeTruthy();
    expect(getByText("Quantity: 2")).toBeTruthy();
    expect(getByTestId("test-price-1")).toBeTruthy();

    expect(getByText("Product 2")).toBeTruthy();
    expect(getByText("Quantity: 1")).toBeTruthy();
    expect(getByTestId("test-price-2")).toBeTruthy();

    // Check total
    expect(getByText("Total: $40.00")).toBeTruthy();

    // Ensure clear cart button is present
    expect(getAllByText("Clear Cart").length).toBeGreaterThan(0);
  });

  it("displays an empty cart message when the cart is empty", () => {
    const { getByText } = renderComponent([]);

    expect(getByText("Your cart is empty!")).toBeTruthy();
  });

  it("calls clearCart when the clear button is pressed", () => {
    const { getByText } = renderComponent();

    const clearButton = getByText("Clear Cart");
    fireEvent.press(clearButton);

    expect(mockClearCart).toHaveBeenCalledTimes(1);
  });

  it("calculates the total correctly", () => {
    renderComponent();

    expect(mockGetTotal).toHaveBeenCalledTimes(1);
    expect(mockGetTotal).toHaveReturnedWith(40.0); // 10 * 2 + 20 * 1
  });
});