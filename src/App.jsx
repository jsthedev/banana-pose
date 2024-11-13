import { BrowserRouter, Routes, Route } from "react-router-dom";

import "@/pages/index.scss";

import LandingPageWrapper from "./pages";
import LandingPage from "./pages/home";
import ProductsPage from "./pages/products";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPageWrapper />}>
          <Route index element={<LandingPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
