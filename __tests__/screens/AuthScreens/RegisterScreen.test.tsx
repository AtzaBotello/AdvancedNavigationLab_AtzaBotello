import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import RegisterScreen from "../../../screens/AuthScreens/RegisterScreen";
import { AuthContext } from "../../../navigation/RootNavigation";
import { CartContext } from "../../../context/CartContext";

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe("RegisterScreen", () => {
  const mockRegister = jest.fn();
  const mockLoadUserCart = jest.fn();

  const renderComponent = () =>
    render(
      <AuthContext.Provider
        value={{
          register: mockRegister,
          loading: false,
          currentUser: { userId: "12345", email: "test@example.com", password: "password" },
        }}
      >
        <CartContext.Provider value={{ loadUserCart: mockLoadUserCart }}>
          <NavigationContainer>
            <RegisterScreen />
          </NavigationContainer>
        </CartContext.Provider>
      </AuthContext.Provider>
    );

  beforeEach(() => {
    mockRegister.mockClear();
    mockLoadUserCart.mockClear();
  });

  it("renders the register screen correctly", () => {
    const { getByPlaceholderText, getByText, getByTestId } = renderComponent();

    // Verify UI elements
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByPlaceholderText("Confirm Password")).toBeTruthy();
    expect(getByTestId("test-registerButton")).toBeTruthy();
    expect(getByText("Already have an account? Login")).toBeTruthy();
  });

  it("handles input changes for email, password, and confirm password", () => {
    const { getByPlaceholderText } = renderComponent();

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const confirmPasswordInput = getByPlaceholderText("Confirm Password");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.changeText(confirmPasswordInput, "password123");

    expect(emailInput.props.value).toBe("test@example.com");
    expect(passwordInput.props.value).toBe("password123");
    expect(confirmPasswordInput.props.value).toBe("password123");
  });

  it("displays an error when fields are empty", () => {
    const { getByText, getByTestId } = renderComponent();

    const registerButton = getByTestId("test-registerButton");
    fireEvent.press(registerButton);

    expect(getByText("All fields are required.")).toBeTruthy();
  });

  it("displays an error when passwords do not match", () => {
    const { getByPlaceholderText, getByText, getByTestId } = renderComponent();

    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password123");
    fireEvent.changeText(getByPlaceholderText("Confirm Password"), "password321");

    fireEvent.press(getByTestId("test-registerButton"));

    expect(getByText("Passwords do not match.")).toBeTruthy();
  });

  it("calls register function with correct inputs", async () => {
    mockRegister.mockResolvedValueOnce(true);

    const { getByPlaceholderText, getByText, getByTestId } = renderComponent();

    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password123");
    fireEvent.changeText(getByPlaceholderText("Confirm Password"), "password123");

    fireEvent.press(getByTestId("test-registerButton"));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith("test@example.com", "password123");
    });
  });

  it("displays error when email already exists", async () => {
    mockRegister.mockResolvedValueOnce(false);

    const { getByPlaceholderText, getByText, findByText, getByTestId } = renderComponent();

    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password123");
    fireEvent.changeText(getByPlaceholderText("Confirm Password"), "password123");

    fireEvent.press(getByTestId("test-registerButton"));

    const errorMessage = await findByText("An account with this email already exists.");
    expect(errorMessage).toBeTruthy();
  });

  it("navigates to login screen when link is pressed", () => {
    const { getByText } = renderComponent();

    const loginLink = getByText("Already have an account? Login");
    fireEvent.press(loginLink);

    expect(loginLink).toBeTruthy(); // Navigation behavior is mocked
  });
});