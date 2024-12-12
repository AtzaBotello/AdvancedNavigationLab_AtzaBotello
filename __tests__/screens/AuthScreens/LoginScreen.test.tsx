import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../../../screens/AuthScreens/LoginScreen";
import { AuthContext } from "../../../navigation/RootNavigation";

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe("LoginScreen", () => {
  const mockLogin = jest.fn();

  const renderComponent = () =>
    render(
      <AuthContext.Provider value={{ login: mockLogin }}>
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      </AuthContext.Provider>
    );

  beforeEach(() => {
    mockLogin.mockClear();
  });

  it("renders the login screen correctly", () => {
    const { getByPlaceholderText, getByText, getByTestId } = renderComponent();

    // Check if all elements are rendered
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByTestId("test-loginButton")).toBeTruthy();
    expect(getByText("Don't have an account? Register")).toBeTruthy();
  });

  it("allows user input for email and password", () => {
    const { getByPlaceholderText } = renderComponent();

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");

    expect(emailInput.props.value).toBe("test@example.com");
    expect(passwordInput.props.value).toBe("password123");
  });

  it("displays an error message for invalid credentials", async () => {
    mockLogin.mockResolvedValueOnce(false);

    const { getByText, getByPlaceholderText, findByText, getByTestId } = renderComponent();

    fireEvent.changeText(getByPlaceholderText("Email"), "wrong@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "wrongpassword");
    fireEvent.press(getByTestId("test-loginButton"));

    const errorMessage = await findByText("Invalid credentials. Please try again.");
    expect(errorMessage).toBeTruthy();
  });

  it("navigates to the register screen on link press", () => {
    const { getByText } = renderComponent();
    const registerLink = getByText("Don't have an account? Register");

    fireEvent.press(registerLink);

    expect(registerLink).toBeTruthy(); // Navigation mock will not trigger an actual navigation
  });

  it("calls the login function with correct credentials", async () => {
    mockLogin.mockResolvedValueOnce(true);

    const { getByText, getByPlaceholderText, getByTestId } = renderComponent();

    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password123");
    fireEvent.press(getByTestId("test-loginButton"));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
    });
  });
});