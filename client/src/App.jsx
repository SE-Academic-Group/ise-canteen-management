import GlobalStyles from "./styles/GlobalStyles";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { DarkModeProvider } from "./context/DarkModeContext";

import ProtectedRoute from "./ui/ProtectedRoute";

import CustomerProductDetail from "./pages/CustomerProductDetail";
import CustomerAccount from "./pages/CustomerAccount";
import CustomerDeposit from "./pages/CustomerDeposit";
import CustomerOrders from "./pages/CustomerOrders";
import CustomerOrder from "./pages/CustomerOrder";
import RedirectPage from "./pages/RedirectPage";
import PageNotFound from "./pages/PageNotFound";
import CreateOrder from "./pages/CreateOrder";
import TodayMenu from "./pages/TodayMenu";
import Inventory from "./pages/Inventory";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Settings from "./pages/Settings";
import Product from "./pages/Product";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
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
              <Route index element={<RedirectPage />} />
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

              <Route path="customer">
                <Route path="order" element={<CustomerOrder />} />
                <Route path="account" element={<CustomerAccount />} />
                <Route
                  path="products/:productId"
                  element={<CustomerProductDetail />}
                />
                <Route path="orders" element={<CustomerOrders />} />
                <Route path="deposit" element={<CustomerDeposit />} />
              </Route>
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
