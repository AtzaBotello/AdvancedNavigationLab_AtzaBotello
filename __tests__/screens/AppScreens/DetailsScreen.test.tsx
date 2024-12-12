import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import DetailsScreen from "../../../screens/AppScreens/DetailsScreen";
import { CartContext } from "../../../context/CartContext";
import { ThemeContext } from "../../../context/themeContext";
import { AnimationContext } from "../../../context/AnimationContext";
import { useFetchProductById } from "../../../service/ApiService";
import { Text } from "react-native";

jest.mock("../../../service/ApiService", () => ({
  useFetchProductById: jest.fn(),
}));

jest.mock("../../../components/CardCarouselItem", () => ({
  __esModule: true,
  default: jest.fn(({ image }) => {
    // Mocked carousel item to prevent errors
    return <MockedCarouselItem testID="carousel-item" image={image} />;
  }),
}));

const MockedCarouselItem = ({ image }: { image: string }) => (
  <Text testID="carousel-item">{image}</Text>
);

describe("DetailsScreen", () => {
  const mockAddToCart = jest.fn();

  const renderComponent = (mockData: any, isLoading = false, isError = false) => {
    (useFetchProductById as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading,
      isError,
    });

    const mockTheme = {
      background: "#fff",
      text: "#000",
      card: "#f9f9f9",
      primary: "#6200EE",
      title: "#fff",
      error: "#FF0000",
    };

    return render(
      <ThemeContext.Provider value={{ theme: mockTheme }}>
        <CartContext.Provider value={{ addToCart: mockAddToCart }}>
          <AnimationContext.Provider value={{ isAnimationEnabled: true }}>
            <NavigationContainer>
              <DetailsScreen />
            </NavigationContainer>
          </AnimationContext.Provider>
        </CartContext.Provider>
      </ThemeContext.Provider>
    );
  };

  it("renders the loading state", () => {
    const { getByTestId } = renderComponent(null, true);

    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  it("renders the error state", () => {
    const { getByText } = renderComponent(null, false, true);

    expect(getByText("Failed to load product details. Please try again.")).toBeTruthy();
  });

  it("renders the product details", () => {
    const mockProduct = {
      id: 1,
      title: "Product 1",
      description: "Product description",
      price: 100,
      images: ["https://via.placeholder.com/150", "https://via.placeholder.com/150"],
    };

    const { getByText, getAllByTestId } = renderComponent(mockProduct);

    expect(getByText("Product 1")).toBeTruthy();
    expect(getByText("Product description")).toBeTruthy();
    expect(getByText("$100.00")).toBeTruthy();
    expect(getAllByTestId("carousel-item").length).toBe(mockProduct.images.length);
  });

  it("handles quantity changes", () => {
    const mockProduct = {
      id: 1,
      title: "Product 1",
      description: "Product description",
      price: 100,
      images: ["https://via.placeholder.com/150"],
    };

    const { getByText, getByTestId } = renderComponent(mockProduct);

    const decrementButton = getByTestId("decrement-quantity");
    const incrementButton = getByTestId("increment-quantity");

    // Test increment
    fireEvent.press(incrementButton);
    expect(getByText("2")).toBeTruthy();

    // Test decrement
    fireEvent.press(decrementButton);
    expect(getByText("1")).toBeTruthy();
  });

  it("adds product to cart", () => {
    const mockProduct = {
      id: 1,
      title: "Product 1",
      description: "Product description",
      price: 100,
      images: ["https://via.placeholder.com/150"],
    };

    const { getByText } = renderComponent(mockProduct);

    const addToCartButton = getByText("Add to Cart");
    fireEvent.press(addToCartButton);

    expect(mockAddToCart).toHaveBeenCalledWith({
      ...mockProduct,
      quantity: 1,
    });
  });

});