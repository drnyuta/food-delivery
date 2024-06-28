import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { MenuPage } from "./pages/MenuPage/MenuPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { Layout } from "components/Layout/Layout";
import { OrderPage } from "pages/OrderPage/OrderPage";
import { RequireAuth } from "components/RequireAuth/RequireAuth";
import { NotFoundPage } from "pages/NotFoundPage/NotFoundPage";
import { ConfirmationPage } from "pages/ConfirmationPage/ConfirmationPage";
import { ThemeProvider } from "components/context/ThemeContext";
import ScrollToTop from "components/ScrollToTop/ScrollToTop";

const App = () => {
  localStorage.removeItem("cartValue");
  const savedCartValue = localStorage.getItem("cartValue");
  const [newCartValue, setNewCartValue] = useState(
    savedCartValue ? +savedCartValue : 0
  );

  useEffect(() => {
    localStorage.setItem("cartValue", newCartValue.toString());

    document.documentElement.style.setProperty(
      "--cart-content",
      `"${newCartValue}"`
    );
  }, [newCartValue]);

  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route element={<NotFoundPage />} path="*" />
              <Route path="/confirmation" element={<ConfirmationPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route index element={<HomePage />} />
              <Route
                path="/menu"
                element={
                  <MenuPage
                    newCartValue={newCartValue}
                    setNewCartValue={setNewCartValue}
                  />
                }
              />
              <Route
                path="/order"
                element={
                  <RequireAuth>
                    <OrderPage
                      newCartValue={newCartValue}
                      setNewCartValue={setNewCartValue}
                    />
                  </RequireAuth>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
