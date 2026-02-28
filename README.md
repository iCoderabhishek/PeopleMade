# PeopleMade: Mini Product Explorer

A React Native application (assignment) for exploring products, managing favorites, and authenticating users, built to meet the specified technical requirements.

## Screenshorts
![Screenshot_2026-03-01-01-59-50-951_com peoplemade](https://github.com/user-attachments/assets/1520ce43-fb03-4cc8-9e9d-7d4bda954e1b)

![Screenshot_2026-03-01-01-59-58-159_com peoplemade](https://github.com/user-attachments/assets/dfb51ec5-e328-4a3f-bca3-c5bf7a7059d4![Screenshot_2026-03-01-02-00-03-490_com peoplemade](https://github.com/user-attachments/assets/84ab26e1-96ff-403b-9753-9a298d327575)
)
![Screenshot_2026-03-01-02-00-15-619_com peoplemade](https://github.com/user-attachments/assets/71326204-efcb-4f89-b125-62db23881ba0)![Screenshot_2026-03-01-02-00-40-459_com peoplemade](https://github.com/user-attachments/assets/40262040-f669-4ff8-bf10-77bd6763138e)


## Folder Structure Diagram![Screenshot_2026-03-01-01-59-37-735_com peoplemade](https://github.com/user-attachments/assets/de78024c-7bb4-![Screenshot_2026-03-01-02-00-20-333_com peoplemade](https://github.com/user-attachments/assets/8fb6245a-4ec9-42d1-a3dc-18358315ec8e)
4776-b27c-97e8![Screenshot_2026-03-01-02-00-11-022_com peoplemade](https://github.com/user-attachments/assets/1e781061-593d-49a8-a149-2f1ee6ca0dc9)
b4447324)

<img width="400" height="800" alt="image" src="https://github.com/user-attachments/assets/4c86e6d5-bff2-48e5-9235-276aa4be6e13" />

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
