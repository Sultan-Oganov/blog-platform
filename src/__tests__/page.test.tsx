import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

// Mock Zustand stores
jest.mock("@/store/useBlogStore", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    originalPosts: [],
    filteredPosts: [],
    setOriginalPosts: jest.fn(),
    setLoading: jest.fn(),
    loading: false,
    currentPage: 1,
    setCurrentPage: jest.fn(),
    addPosts: jest.fn(),
  })),
}));

jest.mock("@/store/useThemeStore", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    theme: "light",
    toggleTheme: jest.fn(),
  })),
}));

describe("Home Page", () => {
  it("renders the heading", () => {
    render(<Home />);
    const heading = screen.getByText(/Recent Blog Posts/i);
    expect(heading).toBeInTheDocument();
  });
});
