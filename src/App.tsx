import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ClientLayout from "./pages/layout/CLientLayout";
import ProductDetail from "./pages/ProductDetail";
import AdminLayout from "./pages/layout/AdminLayout";
import List from "./pages/products/List";
import Add from "./pages/products/Add";
import { Toaster } from "react-hot-toast";
import Update from "./pages/products/Edit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="product" element={<Products />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="news" element={<h1>Tin tức</h1>} />
          <Route path="contact" element={<h1>Liên hệ</h1>} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="product" element={<List />} />
          <Route path="product/add" element={<Add />} />
          <Route path="product/edit/:id" element={<Update />} />
        </Route>
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
