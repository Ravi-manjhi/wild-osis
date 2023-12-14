import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import { DarkContextProvider } from "./contextApi/DarkModeContext";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Booking from "./pages/Booking";
import CheckIn from "./pages/CheckIn";
import ProtectedRouter from "./ui/ProtectedRouter";
import CheckLogin from "./ui/CheckLogin";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRouter>
        <AppLayout />
      </ProtectedRouter>
    ),
    errorElement: <PageNotFound />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "booking", element: <Bookings /> },
      { path: "booking/:id", element: <Booking /> },
      { path: "check-in/:id", element: <CheckIn /> },
      { path: "cabin", element: <Cabins /> },
      { path: "setting", element: <Settings /> },
      { path: "account", element: <Account /> },
      { path: "user", element: <Users /> },
    ],
  },
  {
    path: "login",
    element: (
      <CheckLogin>
        <Login />
      </CheckLogin>
    ),
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <DarkContextProvider>
        <RouterProvider router={router} />
      </DarkContextProvider>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 4000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-gray-0)",
            color: "var(--color-gray-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}
