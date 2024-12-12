import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import HomeScreen from "../../../screens/AppScreens/HomeScreen";
import { ThemeContext } from "../../../context/themeContext";
import { useFetchCategoryList } from "../../../service/ApiService";
import CategoryCarousel from "../../../components/CategoryCarousel";
import { Text } from "react-native";

jest.mock("../../../service/ApiService", () => ({
  useFetchCategoryList: jest.fn(),
}));

jest.mock("../../../components/CategoryCarousel", () => ({
    __esModule: true,
    default: jest.fn(({ category }) => {
      // Mocked carousel item to prevent errors
      return <MockedCategoryCarousel testID="category-carousel" category={category} />;
    }),
}));

const MockedCategoryCarousel = ({ category }: { category: string }) => <Text testID="category-carousel">Carousel</Text>;

describe("HomeScreen", () => {
  const mockTheme = {
    background: "#ffffff",
    text: "#000000",
    primary: "#6200EE",
    card: "#f9f9f9",
  };

  const renderComponent = (categories: string[] | undefined, isLoading: boolean) => {
    (useFetchCategoryList as jest.Mock).mockReturnValue({
      data: categories,
      isLoading,
    });

    return render(
      <ThemeContext.Provider value={{ theme: mockTheme }}>
        <HomeScreen />
      </ThemeContext.Provider>
    );
  };

  it("renders the loading state", () => {
    const { getByTestId } = renderComponent(undefined, true);

    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  it("renders no categories when data is empty", () => {
    const { queryByText } = renderComponent([], false);

    expect(queryByText("Electronics")).toBeNull();
    expect(queryByText("Fashion")).toBeNull();
    expect(queryByText("Beauty")).toBeNull();
  });
});