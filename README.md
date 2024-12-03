
# Blog Platform

A simple blog platform built with **Next.js**, **TypeScript**, and **Zustand**. The platform supports post searching, infinite scrolling, and light/dark theme toggling.

## Features

- **Search Bar**: Real-time filtering of blog posts.
- **Load More**: Fetch and display more posts on demand.
- **Theme Toggle**: Switch between light and dark themes.
- **Optimized Performance**: Supports static site generation (SSG) and lazy-loaded components.
- **Accessibility**: ARIA attributes for better navigation.

## Technologies

- **Next.js**: Server-side rendering and routing.
- **TypeScript**: Type-safe development.
- **Tailwind CSS**: Styling with utility-first classes.
- **Zustand**: State management.
- **Jest + React Testing Library**: Unit and integration testing.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: `>= 16.0.0`
- **Yarn**: `>= 1.22.0`

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Sultan-Oganov/blog-platform.git
   cd blog-platform
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   yarn dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Scripts

- **`yarn dev`**: Start the development server.
- **`yarn build`**: Build the app for production.
- **`yarn start`**: Start the production server.
- **`yarn test`**: Run all tests.
- **`yarn lint`**: Lint the codebase.
- **`yarn format`**: Format the code with Prettier.

---

## Testing

We use **Jest** and **React Testing Library** for testing.

### Running Tests

To execute all tests, run:

```bash
yarn test
```

### Coverage

Generate a coverage report:

```bash
yarn test --coverage
```

Coverage reports will be available in the `coverage/` directory.

### Writing Tests

Tests are located alongside their components in the `src/` directory, using the naming convention `ComponentName.test.tsx`. We mock dependencies like Zustand stores using Jest.

Example for mocking a Zustand store:

```javascript
jest.mock('@/store/useBlogStore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    originalPosts: [],
    filteredPosts: [],
    setOriginalPosts: jest.fn(),
    setFilteredPosts: jest.fn(),
    setLoading: jest.fn(),
    loading: false,
    currentPage: 1,
    setCurrentPage: jest.fn(),
    addPosts: jest.fn(),
  })),
}));
```

---

## Deployment

This project is set up for deployment on **Vercel**.

### Steps to Deploy

1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Vercel will automatically build and deploy your application.

---

## Roadmap

- Add Infinite Scroll for posts.
- Improve accessibility (e.g., ARIA attributes, keyboard navigation).
- Enhance test coverage.
- Optimize images and assets for performance.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contributors

- **Sultan Oganov** ([GitHub](https://github.com/Sultan-Oganov))
