import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ProfileScreen from "../../../screens/AppScreens/ProfileScreen";
import { AuthContext } from "../../../navigation/RootNavigation";
import { ThemeContext } from "../../../context/themeContext";

describe("ProfileScreen", () => {
  const mockTheme = {
    background: "#ffffff",
    text: "#000000",
    primary: "#6200EE",
    card: "#f9f9f9",
    title: "#ffffff",
    error: "#FF0000",
  };

  const mockLogout = jest.fn();

  const renderComponent = (currentUser: { email: string; userId: string } | null) => {
    return render(
      <AuthContext.Provider
        value={{
          currentUser,
          logout: mockLogout,
          login: jest.fn(),
          register: jest.fn(),
          isAuthenticated: !!currentUser,
          loading: false,
        }}
      >
        <ThemeContext.Provider value={{ theme: mockTheme }}>
          <ProfileScreen />
        </ThemeContext.Provider>
      </AuthContext.Provider>
    );
  };

  it("renders the user's profile information", () => {
    const currentUser = { email: "test@example.com", userId: "12345" };

    const { getByText } = renderComponent(currentUser);

    expect(getByText("Profile")).toBeTruthy();
    expect(getByText("Email: test@example.com")).toBeTruthy();
    expect(getByText("User ID: 12345")).toBeTruthy();
  });

  it("renders an error message when no user is logged in", () => {
    const { getByText } = renderComponent(null);

    expect(getByText("No user information available.")).toBeTruthy();
  });

  it("calls logout when the logout button is pressed", async () => {
    const currentUser = { email: "test@example.com", userId: "12345" };

    const { getByText } = renderComponent(currentUser);

    const logoutButton = getByText("Logout");
    fireEvent.press(logoutButton);

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });
  });

  it("applies the correct theme styles", () => {
    const currentUser = { email: "test@example.com", userId: "12345" };

    const { getByText, getByTestId } = renderComponent(currentUser);

    const profileTitle = getByTestId("test-title");
    const logoutButton = getByTestId("test-logout");
    expect(getByTestId("test-title").props.style[1].color).toBe(mockTheme.text);
    expect(logoutButton.props.style.backgroundColor).toBe(mockTheme.primary);
  });
});