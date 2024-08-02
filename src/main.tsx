import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { RootRoute } from "./routes/root";
import "./main.css";
import { HomeRoute, loader as homeLoader } from "@/routes/home";
import { ProductsRoute, loader as productsLoader } from "@/routes/products";
import { ProductRoute, loader as productLoader } from "@/routes/product";
import { ErrorPage } from "./routes/error-page";
import { LoginRoute } from "./routes/login";
import { RegisterRoute } from "./routes/register";
import { Toaster } from "@/components/ui/toaster";
import { CartRoute, loader as cartLoader } from "./routes/cart";
import { cookies } from "./modules/auth";

type RequireAuthProps = {
  children: ReactNode;
};

export const PrivateRoute: React.FC<RequireAuthProps> = ({ children }) => {
  const isAuthenticated = cookies.get("token") !== undefined;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export const PublicRoute: React.FC<RequireAuthProps> = ({ children }) => {
  const isAuthenticated = cookies.get("token") !== undefined;
  return isAuthenticated ? <Navigate to="/" /> : children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomeRoute />,
        loader: homeLoader,
      },
      {
        path: "/products",
        element: <ProductsRoute />,
        loader: productsLoader,
      },
      {
        path: "/products/:slug",
        element: <ProductRoute />,
        loader: productLoader,
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <LoginRoute />
          </PublicRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicRoute>
            <RegisterRoute />
          </PublicRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <CartRoute />
          </PrivateRoute>
        ),
        loader: cartLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
);
