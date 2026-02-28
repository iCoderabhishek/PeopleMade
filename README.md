# PeopleMade: Mini Product Explorer

A React Native application (assignment) for exploring products, managing favorites, and authenticating users, built to meet the specified technical requirements.

## Local Installation Guidelines 

1. **Navigate to the project directory:**
   ```bash
   cd PeopleMade
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**
   Rename `.env.sample` to `.env` (or create a new `.env` file) and ensure it contains:
   ```env
   AUTH_API_URL=https://dummyjson.com
   PRODUCT_API_URL=https://fakestoreapi.com
   ```
4. **Start the application:**
   - **For Android:**
     ```bash
     npm run android
     ```
   - **For iOS (Requires macOS):**
     ```bash
     cd ios && pod install && cd ..
     npm run ios
     ```
5. **Error Handling:**
   If you encounter any setup or environment errors, run:
   ```bash
   npx react-native doctor
   ```

## APK LINK
[Release APK link click here](https://drive.google.com/drive/folders/1LaTTSinyRqY8pYdfPH9vyt_2jsTFTAHU?usp=sharing)
(Or go to `android\app\build\outputs\apk\release` of this repo)
## Features

### Authentication
- **Login Screen:** Username and password fields with Zod validation (username required, password min 6 chars).
- **API Integration:** Authenticates via DummyJSON (`POST /auth/login`).
- **State Management:** Redux handles `auth.token`, `auth.isLoggedIn`, `auth.loading`, and `auth.error`.
- **Session Persistence:** Token is stored in `AsyncStorage` to automatically log users back in across app restarts.

### Product Listing (Home)
- **API Integration:** Fetches data from FakeStoreAPI (`GET /products`).
- **Display Overview:** Renders product image, title, price, and category.
- **Functionality:** 
  - Text search by title (includes input debouncing for performance).
  - Category filtering via scrollable tabs.
  - Pull-to-refresh mechanism.
  - Loading indicators and error states with a dedicated retry option.
- **State Management:** Redux handles `products.items`, `products.filteredItems`, `products.loading`, `products.error`, `products.searchQuery`, and `products.selectedCategory`.

### Product Details
- **User Interface:** Presented using a native bottom sheet instead of a standard screen transition.
- **Details Displayed:** Shows full image, title, price, category, description, and star rating.
- **Actions:** Contains a toggle button to add or remove the item from favorites.

### Favorites
- **Saved List:** Displays all favorited products in a separate tab.
- **Management:** Users can remove items from their favorites directly. Includes empty state handling.
- **State Management:** Redux handles `favorites.items`.
- **Data Persistence:** Favorites list is continuously synced to `AsyncStorage`.

## Folder Structure

The application relies on a feature-based architecture to separate concerns and keep the codebase predictable:

- `src/app/` - React Navigation configurations (Stacks and bottom tabs).
- `src/app-root/` - Global wrappers, providers, and initialization logic (`App.tsx`).
- `src/features/` - Isolated business domains (`auth`, `products`, `favorites`). Each contains its own local components, screens, services, and types.
- `src/redux/` - Global store configuration and the individual state slices.
- `src/shared/` - Reusable cross-domain code (Axios client, UI constants, generic hooks, custom Toast, and Zod schemas).

## Key Decisions

1. **Feature-Based Organization:** Grouping files by domain (e.g., placing product-specific components inside the `products` feature folder) helps maintain separation of concerns better than grouping all components globally in a single directory.
2. **State Hydration:** The app blocks rendering the main navigation stack until `AsyncStorage` finishes loading the authentication token and favorites data. This prevents the user from seeing a disjointed flash of the login screen before reaching the home page.
3. **Single Root Navigator:** To avoid native state mismatches when logging out, the app completely avoids unmounting navigator trees. Instead, it relies on a single Native Stack and uses `initialRouteName` to securely control flow based on the login state.
4. **Derived Filtering State:** Redux only stores the raw array of API products, the search query string, and the target category. The actual filtered product array is computed locally in the view layer via pure functions and memoized. This simplifies reducers and avoids storing redundant data subsets in the global store.

## Tech Stack
- React Native CLI
- Redux Toolkit & React-Redux
- React Navigation
- Axios
- TanStack React Form & Zod
