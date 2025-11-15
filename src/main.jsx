import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ShoppingBagProvider } from "@/contexts/shoppingBagContext";
import { CurrencyProvider } from "./contexts/currencyContext";
import { ProductsProvider } from "@/contexts/productsContext";
import { HelmetProvider } from "react-helmet-async";
import "@/index.scss";
import "@/assets/styles/common-styles.scss";
import App from "@/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <CurrencyProvider>
        <ProductsProvider>
          <ShoppingBagProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ShoppingBagProvider>
        </ProductsProvider>
      </CurrencyProvider>
    </HelmetProvider>
  </StrictMode>
);
