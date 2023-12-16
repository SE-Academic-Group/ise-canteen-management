import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import { DarkModeProvider } from "./context/DarkModeContext";
import GlobalStyles from "./styles/GlobalStyles";

import PageNotFound from "./pages/PageNotFound";
import CreateOrder from "./pages/CreateOrder";
import TodayMenu from "./pages/TodayMenu";
import Inventory from "./pages/Inventory";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Deposit from "./pages/Deposit";
import Orders from "./pages/Orders";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Stats from "./pages/Stats";
import Order from "./pages/Order";
import Menus from "./pages/Menus";
import Menu from "./pages/Menu";

import ProtectedRoute from "./ui/ProtectedRoute";
import CustomerOrder from "./pages/CustomerOrder";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      // staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <GlobalStyles />

      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="account" element={<Account />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:orderId" element={<Order />} />
              <Route path="create-order" element={<CreateOrder />} />
              <Route path="users" element={<Users />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:productId" element={<Product />} />
              <Route path="menus" element={<Menus />} />
              <Route path="menus/:menuId" element={<Menu />} />
              <Route path="today-menu" element={<TodayMenu />} />
              <Route path="deposit" element={<Deposit />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="stats" element={<Stats />} />
              <Route path="settings" element={<Settings />} />

              <Route path="customer-order" element={<CustomerOrder />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </DarkModeProvider>
  );
}

export default App;
