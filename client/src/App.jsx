import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import AppLayout from "./components/layout/AppLayout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductEditPage from "./pages/ProductEditPage";
import ProductListPage from "./pages/ProductListPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<ProductListPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="signin" element={<SigninPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="products/create" element={<ProductEditPage />} />
        <Route path="products/:id" element={<ProductDetailsPage />} />
        <Route path="products/:id/edit" element={<ProductEditPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
